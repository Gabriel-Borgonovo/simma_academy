<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Usuarios') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900">
                    
                     @if (session('success'))
                        <x-flash-message type="success" :message="session('success')" />
                    @elseif (session('error'))
                        <x-flash-message type="error" :message="session('error')" />
                    @endif

                     <div class="py-4">
                        <input
                            type="text"
                            id="user-search"
                            class="border rounded-lg px-4 py-2 w-full"
                            placeholder="Buscar usuario..."
                        />
                    </div>

                    <div class="flex justify-center items-center h-64" id="loader-container">
                        <img src="{{ asset('loader.svg') }}" alt="loading" id="loader" class="w-28" />
                    </div>

                    <div id="user-container" class="overflow-x-auto">
                        {{-- aqui va la tabla --}}
                    </div>

                     <div id="pagination-container" class="mt-4 flex justify-center"></div>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>

    <script>
         document.addEventListener('DOMContentLoaded', function () {
            const searchInput = document.getElementById('user-search');
            const loader = document.getElementById('loader-container');
            const userContainer = document.getElementById('user-container');
            const paginationContainer = document.getElementById('pagination-container');

            // Función para realizar la petición y actualizar la tabla
            const fetchUsers = (search = '', page = 1 ) => {

                loader.style.display = 'flex';
                ajaxHelper({
                    url:`{{ route('usuarios.api') }}?search=${encodeURIComponent(search)}&page=${page}`,
                    method: 'GET',
                    cbSuccess: (data) => {
                        loader.style.display = 'none'; // Ocultar el loader
                        console.log(data);
                        const users = data.data;

                        const headers = ['Orden', 'Nombre', 'Correo', 'Acciones'];

                        const rows = users.map((user, index) => ({
                            id:user.id,
                            orden: (data.per_page * (data.current_page - 1)) + index + 1, // Cálculo del índice
                            // image:user.main_image_path,
                            name: user.name,
                            email: user.email,
                            // phone: user.phone,
                        }));

                        generateTableHelper(headers, rows, 'user-container');

                         // Generar la paginación
                         paginationHelper({
                            containerId: 'pagination-container',
                            currentPage: data.current_page,
                            totalPages: data.last_page,
                            onPageChange: (page) => fetchUsers(search, page),
                        });

                    }
                });
            }

             // Cargar todos los usuarios al inicio
            fetchUsers();

            // Evento para escuchar las entradas del usuario
            searchInput.addEventListener('input', (event) => {
                const searchTerm = event.target.value.trim();
                fetchUsers(searchTerm); // Buscar los usuarios con el término ingresado
            });

         });

    </script>
