/*
NOTA: TODO EL CODIGO ESTÁ BIEN.
HAY VARIACIONES PARA QUE VEAS LAS DIFERENTES MANERAS DE HACER LAS COSAS
*/


// conexion a la DB
import { pool } from "../dbConnect.js";


// metodo GET ========================================
export const getEmpleados = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM empleado");
    res.json(rows);
    
  } catch (error) {
    return res.status(500).json({message:"algo fue mal"})
  }
};


// metodo GET by ID ==================================
export const getEmpleadosById = async (req, res) => {
try {
  const id = req.params.id
  const [rows] = await pool.query("SELECT * FROM empleado WHERE id=?",id);

  // validamos si el id esta en uso
  if (rows.length <= 0){return res.status(404).json(
    {message:"empleado no encontrado"})}
  res.json(rows);

} catch (error) {
  return res.status(500).json({message:"algo fue mal"})
}
};


// metodo POST ==================================
export const postEmpleados = async (req, res) => {
  try {
      // guardamos los datos del req en una constante y la pasamos a la query
  const { nombre, salario } = req.body;
  const [rows] = await pool.query(
    "INSERT INTO empleado (nombre, salario) VALUES (?,?)",
    [nombre, salario]
  );
  //recordemos la consulta es asincrona
  res.send(`empleado creado con exito: ${rows.insertId}`);

  } catch (error) {
  return res.status(500).json({message:"algo fue mal"})
  }
};


// PUT ===========================================
export const putEmpleados = async(req, res) => {
try {
  const {id} = req.params;  // de params sacamos el id que buscamos
  const {nombre, salario} = req.body; // de body sacamos la info

  const [response] = await pool.query('UPDATE empleado SET nombre = ?, salario = ? WHERE id=?', [nombre,salario,id])
  console.log(response)
  res.send("actualizado")

} catch (error) {
  return res.status(500).json({message:'algo salio mal'})
}
};

// PATCH ===========================================
export const patchEmpleados = async(req, res) => {
  try {
    const {id} = req.params;  // de params sacamos el id que buscamos
    const {nombre, salario} = req.body; // de body sacamos la info
                    // IFNULL: en el valor que le pasamos en nulo, toma el valor que ya tenia (nombre)
    const [response] = await pool.query('UPDATE empleado SET nombre = IFNULL(?,nombre), salario = IFNULL(?,salario) WHERE id=?', [nombre,salario,id])
    console.log(response)
    res.send("actualizado")

  } catch (error) {
    return res.status(500).json({message:'algo salio mal'})
  }
};



// DELETE ===========================================
export const deleteEmpleados = async(req, res) => {
  try {
    const id = req.params.id
    const result = await pool.query("DELETE FROM empleado WHERE id=?", id)
  
    // si imprimimos el result por consola vamos a ver toda la info que trae
    console.log(result)
    /*   [
    ResultSetHeader {
      fieldCount: 0,
      affectedRows: 1,
      insertId: 0,
      info: '',
      serverStatus: 2,
      warningStatus: 0,
      changedRows: 0
    },
    undefined
  ]*/
  // podemos usar esta info para manejar la respuesta en el caso que el id no exista
  // En este caso el affectedRow, si ninguna fila de la tabla fue borrada entonces
  // el id no existia. Por lo tanto procedemos a hacer el control
    if (result[0].affectedRows <= 0) return res.status(404).json({ message:"el id no exite" })
  
    res.sendStatus(204)// el codigo 204 significa "todo fue bien pero el back no le respende al cliente"

  } catch (error) {
    return res.status(500).json({message:'algo salio mal'})
  }
};

