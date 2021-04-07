import React from 'react';
import {SushiServiceConsumer} from "../context";

const withSushiStoreService = () => (Wrapper) => {
    return (props) => {
        return (
            <SushiServiceConsumer>
                {
                    (sushiStoreService) => {
                        return <Wrapper {...props} sushiStoreService={sushiStoreService}/>
                    }
                }
            </SushiServiceConsumer>
        )
    }
};

export default withSushiStoreService;
