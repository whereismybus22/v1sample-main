let configData; // Declare the variable

fetch('institutionSpecific/jsonFiles/api.json')
  .then(response => response.json())
  .then(data => {
    configData = data; // Assign fetched data
    displayConfig();   // Call function after data is ready
  })
  .catch(error => {
    console.error('Error loading config.json:', error);
  });

// Function that accesses the data after fetch is complete
function displayConfig() {
  if (!configData || !configData.hypegpstracker) {
    document.getElementById('output').textContent = 'Config not found.';
    return;
  }

  const { url, auth, title } = configData.hypegpstracker;

  const output = `
    URL: ${url}
    Auth: ${auth}
    Title: ${title}
  `;

  document.getElementById('output').textContent = output;
}
