const prisma = require('../prisma/client');

exports.getAll = async (req, res) => {
  try {
    const mataKuliah = await prisma.mataKuliah.findMany({
      where: { userId: req.userId },
      include: { _count: { select: { tugas: true } } }
    });
    res.json(mataKuliah);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const mataKuliah = await prisma.mataKuliah.findFirst({
      where: { id: req.params.id, userId: req.userId },
      include: { tugas: true, _count: { select: { tugas: true } } }
    });
    if (!mataKuliah) return res.status(404).json({ error: 'Mata Kuliah not found' });
    res.json(mataKuliah);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { nama, deskripsi, sks } = req.body;
    const mataKuliah = await prisma.mataKuliah.create({
      data: { nama, deskripsi, sks, userId: req.userId }
    });
    res.status(201).json(mataKuliah);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { nama, deskripsi, sks } = req.body;
    const mataKuliah = await prisma.mataKuliah.updateMany({
      where: { id: req.params.id, userId: req.userId },
      data: { nama, deskripsi, sks }
    });
    if (mataKuliah.count === 0) return res.status(404).json({ error: 'Mata Kuliah not found' });
    res.json({ message: 'Updated successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const result = await prisma.mataKuliah.deleteMany({
      where: { id: req.params.id, userId: req.userId }
    });
    if (result.count === 0) return res.status(404).json({ error: 'Mata Kuliah not found' });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
