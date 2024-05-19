document.addEventListener('DOMContentLoaded', async () => {
    const categorySelect = document.getElementById('categorySelect');
    const quoteDisplay = document.getElementById('quoteDisplay');
    const authorDisplay = document.getElementById('authorDisplay');
    
    try {
        const response = await fetch('https://api.quotable.io/tags');
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const categories = await response.json();

        const filteredCategories = categories.filter(category => category.name !== 'Athletics' && category.name !== 'Age');

        filteredCategories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.name;
            option.textContent = category.name;
            categorySelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching categories:', error);
        const option = document.createElement('option');
        option.value = '';
        option.textContent = 'Failed to load categories';
        categorySelect.appendChild(option);
    }

    document.getElementById('quoteButton').addEventListener('click', async () => {
        const category = categorySelect.value;
        quoteDisplay.textContent = 'Loading...';
        authorDisplay.textContent = '';

        try {
            const response = await fetch(`https://api.quotable.io/random?tags=${category}`);
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }

            const data = await response.json();
            quoteDisplay.textContent = `"${data.content}"`;
            authorDisplay.textContent = `- ${data.author}`;
        } catch (error) {
            quoteDisplay.textContent = 'Failed to fetch quote. Please try again later.';
            authorDisplay.textContent = '';
            console.error('Fetch error:', error);
        }
    });
});
