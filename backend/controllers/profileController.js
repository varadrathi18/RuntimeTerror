import User from '../models/User.js';

export const getProfile = async (req, res) => {
  try {
    const email = req.query.email;
    if (!email) return res.status(400).json({ success: false, message: 'email query required' });
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    const p = user.profile || {};
    return res.json({
      success: true,
      user: {
        name: user.name,
        email: user.email,
        birthdate: p.birthdate || '',
        age: p.age || '',
        contact: p.contact || '',
        class: p.class || '',
        stream: p.stream || ''
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { email, birthdate, age, contact, class: cls, stream } = req.body;
    if (!email) return res.status(400).json({ success: false, message: 'email required' });
    const user = await User.findOneAndUpdate(
      { email },
      { $set: { profile: { birthdate, age, contact, class: cls, stream } } },
      { new: true }
    );
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    return res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};