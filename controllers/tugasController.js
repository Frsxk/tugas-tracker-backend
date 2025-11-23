const prisma = require('../prisma/client');

exports.getAll = async (req, res) => {
  try {
    const tugas = await prisma.tugas.findMany({
      where: { userId: req.userId },
      include: { mataKuliah: { select: { id: true, nama: true, sks: true } } }
    });
    res.json(tugas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const tugas = await prisma.tugas.findFirst({
      where: { id: req.params.id, userId: req.userId },
      include: { mataKuliah: { select: { id: true, nama: true, sks: true } } }
    });
    if (!tugas) return res.status(404).json({ error: 'Tugas not found' });
    res.json(tugas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { nama, deskripsi, status, deadline, mataKuliahId } = req.body;
    const tugas = await prisma.tugas.create({
      data: { nama, deskripsi, status, deadline: new Date(deadline), mataKuliahId, userId: req.userId },
      include: { mataKuliah: { select: { id: true, nama: true, sks: true } } }
    });
    res.status(201).json(tugas);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { nama, deskripsi, status, deadline, mataKuliahId } = req.body;
    const tugas = await prisma.tugas.updateMany({
      where: { id: req.params.id, userId: req.userId },
      data: { nama, deskripsi, status, deadline: deadline ? new Date(deadline) : undefined, mataKuliahId }
    });
    if (tugas.count === 0) return res.status(404).json({ error: 'Tugas not found' });
    res.json({ message: 'Updated successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const result = await prisma.tugas.deleteMany({
      where: { id: req.params.id, userId: req.userId }
    });
    if (result.count === 0) return res.status(404).json({ error: 'Tugas not found' });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
