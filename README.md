# Redux + Zustand -> React

> Guide yourself by the commits.
> 
> Zustand was placed from a new branch, before that it was the redux studies.

### Basic interface for better studies of "Redux/Zustand"
<img width="1142" alt="image" src="https://github.com/user-attachments/assets/92f19eeb-38bb-4f5d-a46d-6a281d08eaa5">


## Redux
It was a simple structure study about the Redux, so nothing complex. 
The structure of folders always can (and probably will) change from project to project in companies... the last I worked, each folder with your functionalities had its own `reducer`, `actions`, `constants`, `selectors` and `saga` if you may, others was more like this project but in a bigger scale ofc.

Some didn't use Redux Thunks, only Redux Saga, so adapt yourself and study those two topics.

## Zustand
Zustand in here is using version 4, but I notices that it's in version 5... and it had some major updates from this project... but you can follow some part of the documentation, it will help.

I worked in a company that instead of having one big store, we had divided, like `usePreferencesStore`, `useOrganizationStore`, `useUserStore`, etc., in different files, I prefer this way.

- [Persist](https://zustand.docs.pmnd.rs/middlewares/persist)
- [How to Migrate to v5 from v4](https://zustand.docs.pmnd.rs/migrations/migrating-to-v5)

