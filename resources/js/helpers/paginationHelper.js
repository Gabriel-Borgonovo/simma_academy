export default function paginationHelper({
    containerId, 
    currentPage, 
    totalPages, 
    onPageChange})
{

    const d = document,
        $container = d.getElementById(containerId);

    if(!$container) return;

    $container.innerHTML = '';// Limpiar el contenedor antes de renderizar

    //crear los bótones de paginación	
    const $paginationList = d.createElement('ul');
    $paginationList.className = 'flex space-x-2';

    if(currentPage > 1){
        const $firstButton = d.createElement('li');
        $firstButton.innerHTML = `<button class="px-4 py-2 bg-gray-300 rounded hidden md:inline-block">Inicio</button>`;
        $firstButton.addEventListener('click', () => onPageChange(1));
        $paginationList.appendChild($firstButton);
    }

     // Botón "Anterior" (visible solo en móvil)
     if (currentPage > 1) {
        const $prevButton = d.createElement('li');
        $prevButton.innerHTML = `<button class="px-4 py-2 bg-gray-300 rounded md:hidden">Anterior</button>`;
        $prevButton.addEventListener('click', () => onPageChange(currentPage - 1));
        $paginationList.appendChild($prevButton);
    }

    // Botones de páginas (mostrar solo 3 botones alrededor de la página actual)
    const startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(totalPages, currentPage + 1);

    for (let i = startPage; i <= endPage; i++) {
        const $pageButton = d.createElement('li');
        $pageButton.innerHTML = `<button class="px-4 py-2 ${
            i === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-300'
        } rounded hidden md:inline-block">${i}</button>`;
        if (i !== currentPage) {
            $pageButton.addEventListener('click', () => onPageChange(i));
        }
        $paginationList.appendChild($pageButton);
    }

     // Botón "Siguiente" (visible solo en móvil)
     if (currentPage < totalPages) {
        const $nextButton = d.createElement('li');
        $nextButton.innerHTML = `<button class="px-4 py-2 bg-gray-300 rounded md:hidden">Siguiente</button>`;
        $nextButton.addEventListener('click', () => onPageChange(currentPage + 1));
        $paginationList.appendChild($nextButton);
    }

    // Botón "Final"
    if (currentPage < totalPages) {
        const $lastButton = d.createElement('li');
        $lastButton.innerHTML = `<button class="px-4 py-2 bg-gray-300 rounded hidden md:inline-block">Final</button>`;
        $lastButton.addEventListener('click', () => onPageChange(totalPages));
        $paginationList.appendChild($lastButton);
    }

    // Añadir la lista al contenedor
    $container.appendChild($paginationList);

}