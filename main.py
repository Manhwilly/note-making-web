from flask import Flask, render_template, jsonify, request, make_response
import sys, json, os

render_templateapp = Flask(__name__)

app=Flask(__name__)

@app.route('/')
def display_homepage():
    return render_template('main.html')

@app.route('/getnote', methods=['POST'])
def get_note():
    title = request.form['Note_title']
    content = request.form['content']
    note_data = {'title': title, 'content': content}
    with open('notes.json', 'a') as f:
        json.dump(note_data, f)
        f.write('\n')
    return render_template('main.html')
  
@app.route('/delete-note', methods=['POST'])
def delete_note():
    # Load the current notes from the file
    with open('note.json', 'r') as f:
        notes = json.load(f)

    # Get the note to delete based on the request data
    title = request.form['title']
    content = request.form['content']
    note_to_delete = None
    for note in notes:
        if note['title'] == title and note['content'] == content:
            note_to_delete = note
            break

    if note_to_delete:
        # Remove the note from the list of notes
        notes.remove(note_to_delete)

        # Save the updated notes to the file
        with open('note.json', 'w') as f:
            json.dump(notes, f)

        return jsonify({'result': 'success'})
    else:
        return jsonify({'result': 'error', 'message': 'Note not found'})

@app.route('/add-note', methods=['POST'])
def add_note():
   note = request.json['note']
   notes.append(note)
   return jsonify({'result': 'success'})

@app.route('/edit-note', methods=['POST'])
def edit_note():
    # Load the current notes from the file
    with open('note.json', 'r') as f:
        notes = json.load(f)

    # Get the note to edit based on the request data
    title = request.form['title']
    content = request.form['content']
    new_content = request.form['new_content']
    note_to_edit = None
    for note in notes:
      if note['title'] == title and note['content'] == content:
            note_to_edit = note
            break
    if note_to_edit:
        # Update the note with the new content
        note_to_edit['content'] = new_content
        # Save the updated notes to the file
        with open('note.json', 'w') as f:
            json.dump(notes, f)
        return jsonify({'result': 'success'})
    else:
        return jsonify({'result': 'error', 'message': 'Note not found'})
@app.route('/api/save-note', methods=['POST'])
def save_note():
   note = request.json['note']
   note.append(note)
   return jsonify({'result': 'success'})
if __name__ == "__main__": 
    app.run(host='0.0.0.0', port=8080)