export default function generateTableHelper(headers, data, containerId, actionUrls = {}) {
    const d = document,
        container = d.getElementById(containerId);

    if (!container) {
        console.error(`El contenedor con ID ${containerId} no existe`);
        return;
    }

    // Crear tabla
    const $table = d.createElement('table');
    $table.className = 'table-auto mt-4 w-full border-collapse border border-gray-300 shadow-lg rounded-lg overflow-hidden';

    // Crear cabeceras
    const theadContent = headers
        .map(header => `<th class="px-6 py-3 border-b border-gray-300 text-left text-gray-600">${header}</th>`)
        .join('');

    $table.innerHTML = `
        <thead>
            <tr class="bg-gray-100 text-gray-700 uppercase text-sm font-semibold tracking-wider">
                ${theadContent}
            </tr>
        </thead>
        <tbody>
            ${
                data.length === 0
                    ? `
                    <tr>
                        <td colspan="${headers.length}" class="px-6 py-4 text-center text-gray-500 italic">
                            No se encontraron resultados
                        </td>
                    </tr>
                    `
                    : data.map(row => {
                          const rowContent = Object.entries(row)
                              .map(([key, value]) => {
                                if (key.toLowerCase() === 'id' || key.toLowerCase() === 'slug') {
                                    return `
                                        <td class="px-6 py-4 border-b border-gray-200 text-sm" style="display: none;">
                                            ${value}
                                        </td>`;
                                }
                                if (key.toLowerCase() === 'image' && value) {
                                      return `
                                        <td class="px-6 py-4 border-b border-gray-200 text-sm">
                                            <img src="${value}" alt="Image" class="w-16 h-16 object-cover rounded">
                                        </td>`;
                                }
                                if (key.toLowerCase() === 'name' && actionUrls.show) {
                                      return `
                                        <td class="px-6 py-4 border-b border-gray-200 text-sm">
                                            <a href="${actionUrls.show(row.slug || row.id)}" class="text-blue-700 hover:underline">
                                                ${value}
                                            </a>
                                        </td>`;
                                  }
                                  return `<td class="px-6 py-4 border-b border-gray-200 text-sm text-gray-800">
                                                ${value}
                                            </td>`;
                              })
                              .join('');

                          
                              const actions = actionUrls.edit || actionUrls.delete || actionUrls.images
                              ? `<td class="border px-4 py-2 flex space-x-2">
                                    ${actionUrls.edit ? `<a href="${actionUrls.edit(row.slug || row.id)}" class="text-blue-500 hover:underline">Editar</a>` : ''}
                                    ${actionUrls.images ? `<a href="${actionUrls.images(row.slug || row.id)}" class="text-green-500 hover:underline">Imágenes</a>` : ''}
                                    ${actionUrls.delete ? `
                                        <form action="${actionUrls.delete(row.id)}" method="POST" onsubmit="return confirm('¿Estás seguro de eliminar este registro?');" class="inline">
                                            <input type="hidden" name="_token" value="${document.querySelector('meta[name="csrf-token"]').content}">
                                            <input type="hidden" name="_method" value="DELETE">
                                            <button type="submit" class="text-red-500 hover:underline">Eliminar</button>
                                        </form>
                                    ` : ''}
                                </td>`
                              : '';

                          return `<tr>${rowContent}${actions}</tr>`;
                      }).join('')
            }
        </tbody>
    `;

    // Limpiar contenedor y agregar tabla
    container.innerHTML = '';
    container.appendChild($table);
}