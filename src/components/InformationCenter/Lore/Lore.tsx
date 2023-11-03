import './Lore.scss';
import Header from '../../Common/Header';
import { Menu } from 'semantic-ui-react';
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import GuardiansListing from '../../Lore/GuardiansListing';
import SpiritsListing from '../../Lore/SpiritsListing';
import CeremoniesListing from '../../Lore/CeremoniesListing';

enum Tab {
  SPIRITS = "Spirits",
  GUARDIANS = "Guardians",
  CEREMONIES = "Ceremonies",
}

function Lore() {
  const navigate = useNavigate();
  const [active, setActive] = useState<string>(Tab.SPIRITS);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const active = searchParams.get("active")
    if (active && Object.values(Tab).toString().indexOf(active) >= 0) {
      setActive(active);
    } else {
      setSearchParams({});
    }
  }, [searchParams, setSearchParams]);

  return (
    <div className="Lore">
      <Header text='Spirits & Guardians' decorated />
      <div className="actions">
        <p className="back-button" onClick={() => navigate('/information-center')}><i className='arrow left icon' /> back</p>
      </div>
      <div className='content'>
        <Menu pointing secondary>
          <Menu.Item
            name={Tab.SPIRITS}
            active={active === Tab.SPIRITS}
            onClick={(_, { name }) => name && setSearchParams({ active: name })}
          />
          <Menu.Item
            name={Tab.GUARDIANS}
            active={active === Tab.GUARDIANS}
            onClick={(_, { name }) => name && setSearchParams({ active: name })}
          />
          <Menu.Item
            name={Tab.CEREMONIES}
            active={active === Tab.CEREMONIES}
            onClick={(_, { name }) => name && setSearchParams({ active: name })}
            disabled
          />
        </Menu>
        {active === Tab.SPIRITS && <SpiritsListing />}
        {active === Tab.GUARDIANS && <GuardiansListing />}
        {active === Tab.CEREMONIES && <CeremoniesListing />}
      </div>
    </div>
  );
}


export default Lore;
