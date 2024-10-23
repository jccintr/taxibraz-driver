import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Historico from '../screens/Historico';
import Pix from '../screens/Pix';
import Veiculo from '../screens/Veiculo';
import CustomDrawer from './CustomDrawer';
import Ganhos from '../screens/Ganhos';




const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={ props => <CustomDrawer {...props}/> }>
       
       <Drawer.Screen name='home' component={Home} options={{headerTitle:'Braz Driver'}}/>
       <Drawer.Screen name="profile" component={Profile} options={{headerTitle:'Meu Perfil'}} />
       <Drawer.Screen name="pix" component={Pix} options={{headerTitle:'Meu Pix'}} />
       <Drawer.Screen name="veiculo" component={Veiculo} options={{headerTitle:'Meu Veículo'}} />
       <Drawer.Screen name="historico" component={Historico} options={{headerTitle:'Histórico de Corridas'}}/>
       <Drawer.Screen name="ganhos" component={Ganhos} options={{headerTitle:'Meus Ganhos'}}/>
      
    </Drawer.Navigator>
  )
}

export default DrawerNavigator
