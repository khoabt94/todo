import { removeUserSocket, saveUserSocket, usersWithSocket } from "@/controllers";
import { ProjectModel, UserModel } from "@/models";
import { createServer } from "http";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Server, Socket } from "socket.io";

const httpServer = createServer();
export const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:5173"
    }
});



export default () => {
    io.on("connection", (socket: Socket) => {

        socket.on('authenticate', async ({ access_token }) => {
            const decoded = jwt.verify(access_token, process.env.JWT_SECRET_KEY as string) as JwtPayload
            const user = await UserModel.findById(decoded.id)


            if (!user) {
                io.emit('unauthenticated')
                return
            }

            saveUserSocket({ socket_id: socket.id, user_id: String(user._id) })
            const projectByUser = await ProjectModel.find({ $or: [{ owner: user._id }, { contributors: user._id }] })
            projectByUser.forEach(project => {
                socket.join(String(project._id))
            })

        });

        socket.on("disconnect", () => {
            removeUserSocket(socket.id)
        });
    });



    httpServer.listen(8000);
}

