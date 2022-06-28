import { List } from 'phosphor-react';
import { useState } from 'react';
import { MenuHeader } from './MenuHeader';
import { ButtonsLogin } from '../ButtonMenu/ButtonsLogin';

import './MenuHamburger.scss';

export function MenuHamburger() {
    const [menu, setMenu] = useState(false);

    return(
        <>
            <div className="menuHamburger" onClick={() => setMenu(!menu)}>
                <List size={25} />
            </div>

            {
                menu ? (
                    <div className="menuResponsive menuVisible">
                        <MenuHeader />

                        <span></span>
                        
                        <ButtonsLogin />
                    </div>
                ) :
                    ''
            }
        </>
    );
}