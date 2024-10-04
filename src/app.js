async function fetchLaunches() {
    try {
        const response = await fetch('https://api.spacexdata.com/v4/launches');
        const launches = await response.json();
        return launches;
    } catch (error) {
        console.error('Error fetching launches:', error);
    }
}

function renderLaunches(launches) {
    const app = document.getElementById('app');
    app.innerHTML = ''; // Limpiar contenido previo

    launches.forEach(launch => {
        const card = document.createElement('div');
        card.className = 'card';

        // Estructura de la tarjeta
        card.innerHTML = `
            <div class="launch-card">
                <img src="${launch.links.patch.small}" alt="${launch.name}">
                <h2>${launch.name}</h2>
            </div>
        `;

        // Evento de clic para mostrar detalles del lanzamiento
        card.addEventListener('click', () => {
            console.log(`Clicked on ${launch.name}`); // Debug: Ver si el clic ocurre
            showDetails(launch);
        });

        app.appendChild(card);
    });
}


function showDetails(launch) {
    console.log(launch); // Debug: Ver si la función se está ejecutando
    const app = document.getElementById('app');
    const details = document.getElementById('details');

    // Ocultar la lista de lanzamientos y mostrar detalles
    app.style.display = 'none'
    details.classList.remove('hidden');

    details.innerHTML = `
        <div class="launch-details">
            <img src="${launch.links.patch.small}" alt="${launch.name}">
            <h2>${launch.name}</h2>
            <p><strong>Fallas:</strong> ${launch.failures.length > 0 ? launch.failures.map(failure => failure.reason).join(', ') : 'Ninguna'}</p>
            <p><strong>Detalles:</strong> ${launch.details || 'No disponible'}</p>
            <p><strong>Número de vuelo:</strong> ${launch.flight_number}</p>
            <p><strong>Fecha y hora de despegue:</strong> ${new Date(launch.date_utc).toLocaleString()}</p>
            <button onclick="goBack()">Volver</button>
        </div>
    `;
}


function goBack() {
    const app = document.getElementById('app');
    const details = document.getElementById('details');

    // Mostrar la lista de lanzamientos y esconder detalles
    app.style.display = 'grid'
    details.classList.add('hidden');
}


document.addEventListener('DOMContentLoaded', async () => {
    const launches = await fetchLaunches();
    renderLaunches(launches);
})

















/* async function fetchLaunches() {
    try {
        const response = await fetch('https://api.spacexdata.com/v4/launches');
        const launches = await response.json();
        return launches;
    } catch (error) {
        console.error('Error fetching launches:', error);
    }
}

function renderLaunches(launches) {
    const app = document.getElementById('app');
    app.innerHTML = ''; // Limpiar contenido previo

    launches.forEach(launch => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <a href="#/1/">
                <img src="${launch.links.patch.small}" alt="${launch.name}">
                <h2>${launch.name}</h2>
                    
            </a>
            
        `;
        card.addEventListener('click', () => showDetails(launch));
        app.appendChild(card);
    });
}

function showDetails(launch) {
    const app = document.getElementById('app');
    const details = document.getElementById('details');

    app.classList.add('hidden');
    details.classList.remove('hidden');

    details.innerHTML = `
        <img src="${launch.links.patch.small}" alt="${launch.name}">
        <h2>${launch.name}</h2>
        <p><strong>Fallas:</strong> ${launch.failures.length > 0 ? launch.failures.map(failure => failure.reason).join(', ') : 'Ninguna'}</p>
        <p><strong>Detalles:</strong> ${launch.details || 'No disponible'}</p>
        <p><strong>Número de vuelo:</strong> ${launch.flight_number}</p>
        <p><strong>Fecha y hora de despegue:</strong> ${new Date(launch.date_utc).toLocaleString()}</p>
        <button onclick="goBack()">Volver</button>
    `;
}

function goBack() {
    const app = document.getElementById('app');
    const details = document.getElementById('details');

    app.classList.remove('hidden');
    details.classList.add('hidden');
}

document.addEventListener('DOMContentLoaded', async () => {
    const launches = await fetchLaunches();
    renderLaunches(launches);
});

 */