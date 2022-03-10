const { nanoid } = require('nanoid');
const notes = require('./notes');

// Handler for add note
const addNoteHandler = (req, h) => {
  const { title, tags, body } = req.payload;
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    title, tags, body, id, createdAt, updatedAt,
  };

  notes.push(newNote);

  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    console.log(notes);
    const res = h.response({
      status: 'Success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId: id,
      },
    });
    res.code(201);
    return res;
  }

  return false;
};

// Handler for get all notes
const getAllNotesHandler = () => ({
  status: 'Success',
  data: {
    notes,
  },
});

// Handlre for get one note
const getNoteById = (req, h) => {
  const { id } = req.params;
  const note = notes.filter((n) => n.id === id)[0];
  console.log(note);

  if (note !== undefined) {
    return {
      status: 'Success',
      data: {
        note,
      },
    };
  }
  const res = h.response({
    status: 'fail',
    message: 'Catatan tidak ditemukan',
  });
  res.code(404);
  return res;
};

// Edit note handler
const editNoteByIdHandler = (req, h) => {
  const { id } = req.params;
  const { title, tags, body } = req.payload;
  const updatedAt = new Date().toISOString();

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };
  }

  const res = h.response({
    status: 'success',
    message: 'Catatan berhasil diperbarui',
  });

  res.code(200);
  return res;
};

// Delete note handler
const deleteNoteByIdHandler = (req, h) => {
  const { id } = req.params;
  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes.splice(index, 1);
    const res = h.response({
      status: 'Success',
      message: 'Catatan berhasil dihapus',
    });
    res.code(200);
    return res;
  }
  const res = h.res({
    status: 'fail',
    message: 'Catatan gagal dihapus. Id tidak ditemukan',
  });
  res.code(404);
  return res;
};

module.exports = {
  addNoteHandler,
  getAllNotesHandler,
  getNoteById,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
};
