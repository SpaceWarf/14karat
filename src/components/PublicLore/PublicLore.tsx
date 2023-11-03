import './PublicLore.scss';
import { Menu } from 'semantic-ui-react';
import Logo from '../Common/Logo';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import GuardiansListing from '../Lore/GuardiansListing';
import SpiritsListing from '../Lore/SpiritsListing';
import CeremoniesListing from '../Lore/CeremoniesListing';

enum Tab {
  SPIRITS = "Spirits",
  GUARDIANS = "Guardians",
  CEREMONIES = "Ceremonies"
}

function PublicLore() {
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
    <div className="PublicLore">
      <div className='content'>
        <div className='Header'>
          <Logo />
        </div>
        <div>
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
    </div>
  );
}


export default PublicLore;
