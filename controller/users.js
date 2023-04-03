const pool = require('../dbclient');

const getUsers = async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * from users');
    res.json({ data: rows });
  } catch (err) {
    console.log(err.message);
    res.sendStatus(500);
  }
};

const getOneUser = async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query('SELECT * FROM users WHERE id=$1;', [id]);
	 // console.log('rows', rows.length);
    if(rows.length) return res.json({ data: rows });
	 else return res.status(404).json({ message: 'not found' });  // 	 res.status(404).json('not found' );

  } catch (e) {
    res.sendStatus(404);
  }
};

const postUser = async (req, res) => {
  const { firstname, lastname, age } = req.body;
  try {
    const { rows } = await pool.query(
      'INSERT INTO users (first_name, last_name, age) VALUES ($1, $2, $3) RETURNING *',
      [firstname, lastname, age]
    );
    res.json({ data: rows });
  } catch (e) {
    res.sendStatus(403);
  }
};



const putUser = async (req, res) => {
	const { id } = req.params;
	// const { firstname, lastname, age } = req.body;
	try {

		if({ firstname, lastname, age } = req.body) throw "my error";
		else {

			const { rows } = await pool.query(
				'UPDATE users SET first_name=$1, last_name=$2, age=$3 WHERE id=$4 RETURNING *',
				[firstname, lastname, age, id]
				);
				res.json({ data: rows });
		}


	} catch (err) {
		console.log('Cannot destructure property of req.body')
		console.log('error:', err.message)
		res.sendStatus(403);
	}
};




const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query('DELETE FROM users WHERE id=$1', [id]);
    res.json({ message: `user with id ${id} deleted` });
  } catch (err) {
    res.sendStatus(404);
  }
};

const getUserOrders = async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query(
      'SELECT * FROM orders JOIN users on orders.user_id = users.id WHERE users.id = $1',
      [id]
    );
    res.json({ data: rows });
  } catch (error) {
    console.log(error);
  }
};

const setUserInactive = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await pool.query('Select * from users where id = $1', [id]);
    if (user.rows.length < 1) {
      return res.json({ message: 'user does not exist' });
    }
    const { rows: count } = await pool.query(
      ' SELECT COUNT(*) FROM orders JOIN users on orders.user_id = users.id WHERE users.id = $1',
      [id]
    );
    if (count[0].count < 1) {
      const updatedUser = pool.query(
        'UPDATE users SET active = false WHERE id = $1',
        [id]
      );
      return res.json({ message: 'user set to inactive' });
    }
    res.json({ message: 'user was active' });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getUsers,
  getOneUser,
  putUser,
  deleteUser,
  postUser,
};