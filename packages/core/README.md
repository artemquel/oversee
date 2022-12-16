# Oversee

Oversee is a minimalistic library that allows you to describe business logic for applications without relying on React features.


## Installation

Install @oversee/core with npm

```bash
npm install @oversee/core
```
or with yarn
```bash
yarn add @oversee/core
```
Oversee uses `react` & `react-dom` as a peer dependency


## Features

- Zero boilerplate
- No need to think about loading, error handling and storing data in storage
- Strong typing that works great with IDE auto-completion
- Easy ability to control the app from outside
- It's easy to write unit tests on the logic since it doesn't know anything about the view
- It is easy to make changes to the view as it is not burdened with logic


## Usage/Examples

First of all, you need a class that implements the business logic of the application
```typescript
interface IUser {
    name: string;
    email: string;
    birthday: Date;
}

class User implements IUser {
    constructor(public name: string, public email: string, public birthday: Date){}
}

class UserRepository {
    private users: Map<string, IUser> = new Map();

    public async add(user: IUser){
        return new Promise((resolve, reject)=>{
            if(this.users.get(user.email)){
                reject("This user already exists");
            }else{
                this.users.set(user.email, new User(user.name, user.email, user.birthday));
                resolve(user);
            }
        })
    }

    public async get(email: string){
        return new Promise((resolve, reject)=>{
            const user = this.users.get(email);

            if(!user){
                reject("User not found");
            }else{
                resolve(user);
            }
        })
    }

    public getAll() {
        return [...this.users.values()];
    }
}
```
This is a common class that can be found anywhere. In order to work with it in Oversee, you only need to add a decorator.
```typescript
...
    @Oversee()
    public async add(user: IUser){
        return new Promise((resolve, reject)=>{
...
```
With this decorator, we are telling that the returned result should be observable by the library, for further use in React. We can also decorate whole class, then all public methods will be observed:
```
...
@OverseeAll()
class UserRepository {
...
```
To use it in React, you need to wrap the application in an `<OverseeProvider>`. In controllers property, you must pass instances of all classes used.
```
...
const controllers = [new UserController()];

root.render(
  <OverseeProvider controllers={controllers}>
    <App />
  </OverseeProvider>
);
...
```
Finally, we have three hooks to bind our controller to the component. To get an instance of your controller, you need to use the hook `useController`. You must pass a class constructor as an argument:
```typescript
const userController = useController(UserController);
```
There are two hooks for getting data. If you just want to get the value use `useWatch`:
```typescript
const user = useWatch(UserController, "get");
```
When the `userController.get` method is called, `user` will be the last returned user. If the method returns a promise, the value will only be written after it has been successfully resolved.
If you need more complex work with methods that return a promise, then use `useAsyncWatch` instead:
```typescript
const {loading, result, error} = useWatch(UserController, "get");
```
This can be useful for handling errors, enabling a loading spinner, and so on.