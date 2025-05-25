import jwt from 'jsonwebtoken';



export const checkAuthorization = (req,res,next)=>{
    try {
        const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

        if (token) {
            try {
                const decodet = jwt.verify(token, process.env.JWT_SECRET)
                req.employeeId = decodet.employeeId
                next()
            } catch (error) {
                console.log(error)
                return res.json({
                    "message":"нет доступа"
                })
            }
        }
        else {
            return res.json({
                "message":"нет доступа"
            })
        }
    } catch (error) {
        return res.status(403).json({
            message: 'Нет доступа',
        })
    }
}