import { ReactNode } from "react";
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";

type StoreProviderProps = {
    children: ReactNode;
};

export default function StoreProvider({
    children
}: Readonly<StoreProviderProps>) {
    return (
        <>
            <Provider store={store}>
                <PersistGate loading={<div>Loading...</div>} persistor={persistor}></PersistGate>
                {children}
                
                </Provider>
        </>
    )
}