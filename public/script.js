// Notification helper
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// API interaction functions
async function testAPI() {
    try {
        const response = await fetch('/api/health');
        const data = await response.json();
        showNotification(`API Status: ${data.status} - ${data.message}`, 'success');
        console.log('Health check:', data);
    } catch (error) {
        showNotification('Error connecting to API: ' + error.message, 'error');
        console.error('API error:', error);
    }
}

async function fetchData() {
    try {
        const response = await fetch('/api/data');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

// Form submission handler
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('demoForm');
    const responseBox = document.getElementById('apiResponse');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = {
            name: document.getElementById('nameInput').value,
            email: document.getElementById('emailInput').value,
            message: document.getElementById('messageInput').value,
            timestamp: new Date().toISOString()
        };

        responseBox.innerHTML = '<p>Sending data...</p>';

        try {
            const response = await fetch('/api/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();
            
            responseBox.innerHTML = `
                <pre>${JSON.stringify(result, null, 2)}</pre>
            `;

            if (result.success) {
                showNotification('Form submitted successfully!', 'success');
                // Clear form
                form.reset();
            } else {
                showNotification(result.message || 'Submission failed', 'error');
            }
        } catch (error) {
            responseBox.innerHTML = `
                <p style="color: red;">Error: ${error.message}</p>
            `;
            showNotification('Error submitting form: ' + error.message, 'error');
            console.error('Form submission error:', error);
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Load initial data
    loadInitialData();
});

async function loadInitialData() {
    try {
        const data = await fetchData();
        console.log('Initial data loaded:', data);
    } catch (error) {
        console.error('Failed to load initial data:', error);
    }
}

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        testAPI,
        fetchData
    };
}
