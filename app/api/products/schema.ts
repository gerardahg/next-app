//En este archivo es donde creamos nuestro 'template' del json que vamos a recibir con la librearia de zod
import { z } from 'zod'

//Existen tambien por ejemplo: z.min(?), z.email(), etc.
const schema = z.object({
    name: z.string().min(1),
    price: z.number()
})

export default schema