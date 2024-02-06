import { Router } from 'express';
import { AuthController } from './controller';
import { AuthDatasourceImpl, AuthRepositoryImpl } from '../../infrastructure';


export class AuthRoutes {

    static get routes(): Router {

        const datasource = new AuthDatasourceImpl();
        const authRepository = new AuthRepositoryImpl(datasource);
        
        const router = Router();
        const controller = new AuthController(authRepository);

        // Definir todas mis rutas principales
        router.use('/login', controller.loginUser );
        router.use('/register', controller.registerUser );
        
        return router;
    }
}