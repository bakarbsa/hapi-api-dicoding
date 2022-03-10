const { nanoid } = require('nanoid');
const notes = require('./notes');

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

module.exports = { addNoteHandler };
