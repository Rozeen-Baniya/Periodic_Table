document.addEventListener('DOMContentLoaded', () => {
  const periodicTable = document.getElementById('periodic-table');
  const modal = document.getElementById('element-modal');
  const closeButton = document.querySelector('.close-button');
  const elementName = document.getElementById('element-name');
  const elementDetails = document.getElementById('element-details');

  // Fetch periodic table data
  fetch('https://raw.githubusercontent.com/Bowserinator/Periodic-Table-JSON/master/PeriodicTableJSON.json')
      .then(response => {
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
      })
      .then(data => {
          data.elements.forEach(element => {
              // Create element div
              const elementDiv = document.createElement('div');
              elementDiv.classList.add('element');
              elementDiv.style.gridColumn = element.xpos;
              elementDiv.style.gridRow = element.ypos;

              elementDiv.innerHTML = `
                  <strong>${element.symbol}</strong>
                  <small>${element.number}</small>
              `;

              // Add click event listener
              elementDiv.addEventListener('click', () => {
                  elementName.textContent = `${element.name} (${element.symbol})`;
                  elementDetails.innerHTML = `
                      <p><strong>Atomic Number:</strong> ${element.number}</p>
                      <p><strong>Atomic Mass:</strong> ${element.atomic_mass?.toFixed(2) || 'Unknown'}</p>
                      <p><strong>Category:</strong> ${element.category}</p>
                      <p><strong>Phase:</strong> ${element.phase}</p>
                      <p><strong>Summary:</strong> ${element.summary}</p>
                      <p><a href="${element.source}" target="_blank">More Information</a></p>
                  `;
                  modal.style.display = 'flex'; // Show modal
              });

              // Append to periodic table
              periodicTable.appendChild(elementDiv);
          });
      })
      .catch(error => console.error('Error fetching periodic table data:', error));

  // Close modal on button click
  closeButton.addEventListener('click', () => {
      modal.style.display = 'none';
  });

  // Close modal on outside click
  window.addEventListener('click', (event) => {
      if (event.target === modal) {
          modal.style.display = 'none';
      }
  });
});
