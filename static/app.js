// Función para agregar tarea
function agregarTarea() {
    const tareaTexto = $("#taskInput").val().trim();
    if (!tareaTexto) return;
    
    $.post("/agregar_tarea", { tarea: tareaTexto }, function(data) {
        if (data.success) {
            const nuevaTarea = data.tarea;
            const row = `
                <tr>
                    <td>${nuevaTarea.texto}</td>
                    <td>
                        <button class="complete-btn" data-id="${nuevaTarea.id}">Completar</button>
                        <button class="delete-btn" data-id="${nuevaTarea.id}" data-completed="false">Eliminar</button>
                    </td>
                </tr>
            `;
            $("#pendingTasks").append(row);
            $("#taskInput").val('');
        }
    }).fail(function() {
        alert("Error al agregar la tarea");
    });
}

// Función para completar tarea
function completarTarea(button) {
    const tareaId = $(button).data('id');
    $.post("/completar_tarea", { tarea_id: tareaId }, function(data) {
        if (data.success) {
            const fila = $(button).closest('tr');
            const tareaTexto = fila.find('td:first').text();
            const tareaId = $(button).data('id');
            
            fila.remove();
            
            const nuevaFila = `
                <tr>
                    <td>${tareaTexto}</td>
                    <td>
                        <button class="delete-btn" data-id="${tareaId}" data-completed="true">Eliminar</button>
                    </td>
                </tr>
            `;
            $("#completedTasks").append(nuevaFila);
        }
    }).fail(function() {
        alert("Error al completar la tarea");
    });
}

// Función para eliminar tarea
function eliminarTarea(button) {
    const tareaId = $(button).data('id');
    const esCompletada = $(button).data('completed');
    
    $.post("/eliminar_tarea", { tarea_id: tareaId, es_completada: esCompletada }, function(data) {
        if (data.success) {
            $(button).closest('tr').remove();
        }
    }).fail(function() {
        alert("Error al eliminar la tarea");
    });
}

// Eventos iniciales
$(document).ready(function() {
    // Agregar tarea
    $("#addTaskBtn").click(agregarTarea);
    
    // Agregar con Enter
    $("#taskInput").keypress(function(e) {
        if (e.which === 13) agregarTarea();
    });
    
    // Delegación de eventos para botones dinámicos
    $(document).on('click', '.complete-btn', function() {
        completarTarea(this);
    });
    
    $(document).on('click', '.delete-btn', function() {
        eliminarTarea(this);
    });
});