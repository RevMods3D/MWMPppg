// Function to fetch and display servers
async function loadServers() {
    const container = document.getElementById('server-list');
    container.innerHTML = '<p>Loading servers...</p>'; // temporary message

    try {
        const response = await fetch('https://nodejs-production-d173.up.railway.app/api/servers');
        if (!response.ok) throw new Error('Network response was not ok');

        const servers = await response.json();
        container.innerHTML = ''; // clear loading text

        // Loop through servers and create cards
        servers.forEach(server => {
            const card = document.createElement('div');
            card.className = `server-card ${server.online ? 'online' : 'offline'} ${server.full ? 'full' : ''}`;
            card.innerHTML = `
                <h3>${server.name}</h3>
                <p><i class="fas fa-user"></i> ${server.players.length}/${server.maxPlayers} players</p>
                <p><i class="fas fa-tachometer-alt"></i> Ping: ${server.ping ?? 'N/A'}ms</p>
            `;

            // Set CSS variable for hover color
            let hoverColor;
            if (!server.online) hoverColor = '#888';                  // offline = gray
            else if (server.players.length >= server.maxPlayers) hoverColor = '#ff3300'; // full = red
            else hoverColor = '#00ff99';                             // online & available = green

            card.style.setProperty('--server-color', hoverColor);
            container.appendChild(card);
        });

    } catch (error) {
        console.error('Failed to load servers:', error);
        container.innerHTML = '<p>Unable to load server list. Please try again later.</p>';
    }
}

// Load servers on page load
document.addEventListener('DOMContentLoaded', loadServers);

// Refresh server list every 10 seconds
setInterval(loadServers, 10000);
