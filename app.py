from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Almacenamiento de tareas (en memoria)
tareas = {
    "pendientes": [
        {"id": 1, "texto": "Estudiar Python"},
        {"id": 2, "texto": "Hacer ejercicio"}
    ],
    "completadas": [
        {"id": 3, "texto": "Comprar víveres"}
    ]
}

@app.route('/')
def index():
    return render_template('index.html', tareas=tareas)

@app.route('/agregar_tarea', methods=['POST'])
def agregar_tarea():
    tarea = request.form.get('tarea')
    if tarea:
        nueva_id = max([t['id'] for lista in tareas.values() for t in lista], default=0) + 1
        nueva_tarea = {"id": nueva_id, "texto": tarea}
        tareas["pendientes"].append(nueva_tarea)
        return jsonify(success=True, tarea=nueva_tarea)
    return jsonify(success=False)

@app.route('/completar_tarea', methods=['POST'])
def completar_tarea():
    tarea_id = int(request.form.get('tarea_id'))
    for i, tarea in enumerate(tareas["pendientes"]):
        if tarea["id"] == tarea_id:
            tarea_completada = tareas["pendientes"].pop(i)
            tareas["completadas"].append(tarea_completada)
            return jsonify(success=True)
    return jsonify(success=False)

@app.route('/eliminar_tarea', methods=['POST'])
def eliminar_tarea():
    tarea_id = int(request.form.get('tarea_id'))
    es_completada = request.form.get('es_completada') == 'true'
    
    if es_completada:
        for i, tarea in enumerate(tareas["completadas"]):
            if tarea["id"] == tarea_id:
                tareas["completadas"].pop(i)
                return jsonify(success=True)
    else:
        for i, tarea in enumerate(tareas["pendientes"]):
            if tarea["id"] == tarea_id:
                tareas["pendientes"].pop(i)
                return jsonify(success=True)
                
    return jsonify(success=False)

if __name__ == '__main__':
    app.run(debug=True)