import { Container } from "inversify";
import { UserRepository } from "../repository/UserRepository.js";

const userContainer = new Container();
userContainer.bind(UserRepository).toSelf()

export { userContainer }