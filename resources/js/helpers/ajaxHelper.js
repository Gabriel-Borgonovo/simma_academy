export default async function ajaxHelper({ url, method = 'GET', body = null, headers = {}, cbSuccess }) {
    try {
        const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

        const options = {
            method,
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrfToken, // Incluye el token CSRF
                ...headers,
            },
            body: body ? JSON.stringify(body) : null,
        };

        const response = await fetch(url, options);

        if (!response.ok) {
            throw {
                status: response.status,
                statusText: response.statusText,
            };
        }

        const json = await response.json();

        // Llama a la función de éxito si todo salió bien
        cbSuccess(json);
    } catch (err) {
        const message = err.statusText || "Ocurrió un error al acceder a la API.";
        const errorElement = document.querySelector('.error-message');

        // Renderiza el error en un contenedor genérico (opcional)
        if (errorElement) {
            errorElement.innerHTML = `<p>Error ${err.status}: ${message}</p>`;
            errorElement.style.display = 'block';
        }

        // Opcional: Loguea el error
        console.error(err);
    } finally {
        // Oculta el loader si existe
        const loader = document.querySelector('.loader');
        if (loader) loader.style.display = 'none';
    }
}