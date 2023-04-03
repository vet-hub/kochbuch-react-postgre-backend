const pool = require('../dbclient');

const getCategs = async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * from category');
    res.json({ data: rows });
  } catch (err) {
    console.log(err.message);
    res.sendStatus(500);
  }
};

const getOneCateg = async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query('SELECT * FROM category WHERE id=$1;', [id]);
	 // console.log('rows', rows.length);
    if(rows.length) return res.json({ data: rows });
	 else return res.status(404).json({ message: 'not found' });  // 	 res.status(404).json('not found' );

  } catch (e) {
    res.sendStatus(404);
  }
};

const postCateg = async (req, res) => {
  const { firstname, lastname, age } = req.body;
  try {
    const { rows } = await pool.query(
      'INSERT INTO category (first_name, last_name, age) VALUES ($1, $2, $3) RETURNING *',
      [firstname, lastname, age]
    );
    res.json({ data: rows });
  } catch (e) {
    res.sendStatus(403);
  }
};



const putCateg = async (req, res) => {
	const { id } = req.params;
	// const { firstname, lastname, age } = req.body;
	try {

		if({ firstname, lastname, age } = req.body) throw "my error";
		else {

			const { rows } = await pool.query(
				'UPDATE category SET first_name=$1, last_name=$2, age=$3 WHERE id=$4 RETURNING *',
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




const deleteCateg = async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query('DELETE FROM category WHERE id=$1', [id]);
    res.json({ message: `category with id ${id} deleted` });
  } catch (err) {
    res.sendStatus(404);
  }
};

const getCategResipes = async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query(
      'SELECT * FROM orders JOIN category on orders.categ_id = categ.id WHERE categ.id = $1',
      [id]
    );
    res.json({ data: rows });
  } catch (error) {
    console.log(error);
  }
};

const setCategInactive = async (req, res) => {
  const { id } = req.params;
  try {
    const Categ = await pool.query('Select * from Categs where id = $1', [id]);
    if (Categ.rows.length < 1) {
      return res.json({ message: 'Categ does not exist' });
    }
    const { rows: count } = await pool.query(
      ' SELECT COUNT(*) FROM orders JOIN Categs on orders.Categ_id = Categs.id WHERE Categs.id = $1',
      [id]
    );
    if (count[0].count < 1) {
      const updatedCateg = pool.query(
        'UPDATE Categs SET active = false WHERE id = $1',
        [id]
      );
      return res.json({ message: 'Categ set to inactive' });
    }
    res.json({ message: 'Categ was active' });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getCategs,
  getOneCateg,
  putCateg,
  deleteCateg,
  postCateg,
};