import IInteractor from './IInteractor';
import UserEntity from '../entities/UserEntity';
import { IUserGateway } from '../entities/gateways/IUserGateway';

class UserInteractor implements IInteractor<UserEntity>{
    constructor(private readonly userGateway: IUserGateway) {
    }

    createInstance(data: any): UserEntity {
        return UserEntity.create(data);
    }

    async getUserById(id: number): Promise<UserEntity> {
        const userEntity: UserEntity = await this.userGateway.fetchUserById(id);
        
        if (userEntity == null) {
            throw new Error('User not found');
        }

        return userEntity;
    }

    async createUser(userInstance: UserEntity): Promise<UserEntity> {
        try {
            const userEntity: UserEntity = await this.userGateway.createUser(userInstance);
            return userEntity;
        } catch (error) {
            // TODO: add logging
            throw error;
        }
    }
}

export default UserInteractor;
