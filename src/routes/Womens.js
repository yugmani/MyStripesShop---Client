import React from 'react';

import { BannerSlim } from '../components/Banner';
import ShopSection from '../components/ShopSection';

function Womens() {
    return (
        <div className="content-wrap" >
            <BannerSlim />
            <ShopSection path='womens' />
        </div>
    );
}

export default Womens;