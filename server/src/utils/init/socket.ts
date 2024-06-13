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
        console.log(`new connection ${socket.id}`)

        socket.on('authenticate', async ({ access_token }) => {
            const decoded = jwt.verify(access_token, process.env.JWT_SECRET_KEY as string) as JwtPayload
            const user = await UserModel.findById(decoded.id)

            if (!user) {
                io.emit('unauthenticated')
                return
            }
            const projectByUser = await ProjectModel.find({ $or: [{ owner: user._id }, { contributors: user._id }] })
            projectByUser.forEach(project => {
                socket.join(String(project._id))
            })
        });
    });

    httpServer.listen(8000);
}

