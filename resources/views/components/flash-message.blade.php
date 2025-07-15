<div x-data="{ show: true }" x-show="show" x-init="setTimeout(() => show = false, 3000)" class="p-4 mt-4 rounded"
    :class="{
        'bg-green-500 text-white': '{{ $type }}' === 'success',
        'bg-red-500 text-white': '{{ $type }}' === 'error'
    }">
    {{ $message }}
</div>