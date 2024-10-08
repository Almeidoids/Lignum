import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable, GestureResponderEvent } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { propsStack } from '../../tipos/navigation';

// Definindo os tipos para as props do ProfileSection
interface ProfileSectionProps {
  username: string;
  email: string;
}

// Componente da Seção de Perfil
const ProfileSection: React.FC<ProfileSectionProps> = ({ username, email }) => {
  return (
    <View style={styles.profileContainer}>
      <View style={styles.profileIconWrapper}>
        <Image
          source={require('../../assets/images/iconesCellbit/perfil.png')}
          style={styles.profileIcon}
        />
      </View>
      <View style={styles.profileInfo}>
        <Text style={styles.profileName}>{username}</Text>
        <Text style={styles.profileEmail}>{email}</Text>
        {/*<Link href="/" style={styles.editProfile}> {/*tela de login */}
          <Text>EDITAR</Text>
      </View>
    </View>
  );
};

// Componente para Itens da Grid
interface GridItemProps {
  icon: any;
  label: string;
  acao: (event : GestureResponderEvent) => void;
}

const GridItem: React.FC<GridItemProps> = ({ icon, label, acao }) => {
    return (
    <View style={styles.itemWrapper}>
      {/*<Link href={link}>*/}
        <Pressable style={styles.item} onPress = {acao}>
          <Image source={icon} style={styles.icon} />
        </Pressable>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

// Componente Principal
const MainScreen: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const navigation = useNavigation<propsStack>();

  useEffect(() => {
    const loadUserData = async () => {
      const storedUsername = await AsyncStorage.getItem('@asyncStorage:nameUser');
      const storedEmail = await AsyncStorage.getItem('@asyncStorage:emailUser');
      
      if (storedUsername && storedEmail) {
        setUsername(storedUsername);
        setEmail(storedEmail);
      }
    };

    loadUserData();
  }, []);
{/* colcoar link das tela abaixo */}
    
  return (
    <View style={styles.container}>
      <ProfileSection username={username} email={email} />
      <View style={styles.grid}>
        <GridItem icon={require('../../assets/images/iconesCellbit/progresso.png')} label="PROGRESSO" acao = {() => console.log("Progresso")} /> 
        <GridItem icon={require('../../assets/images/iconesCellbit/financeiro.png')} label="FINANCEIRO" acao = {() => console.log("Financeiro")} />
        <GridItem icon={require('../../assets/images/iconesCellbit/timer.png')} label="TIMER" acao = {() => navigation.navigate("Timer")} />
        <GridItem icon={require('../../assets/images/iconesCellbit/calendario.png')} label="CALENDÁRIO" acao = {() => navigation.navigate("Calendario")} />
        <GridItem icon={require('../../assets/images/iconesCellbit/comunidade.png')} label="COMUNIDADE" acao = {() => navigation.navigate("Login")} />
        <GridItem icon={require('../../assets/images/iconesCellbit/cronograma.png')} label="CRONOGRAMAS" acao = {() => console.log("Cronograma")} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#17272E',
    paddingTop: 0,
    paddingHorizontal: 20,
  },
  profileContainer: {
    marginTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginLeft: 15,
  },
  profileIconWrapper: {
    width: 120,
    height: 120,
    backgroundColor: '#0F2026',
    borderRadius: 160,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  profileIcon: {
    width: 70,
    height: 70,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    color: 'white',
    fontSize: 24,
    marginBottom: 0,
  },
  profileEmail: {
    color: '#9AA0A6',
    fontSize: 18,
    marginBottom: 8,
  },
  editProfile: {
    color: '#E7B12C',
    fontSize: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 15,
    justifyContent: 'space-around',
  },
  itemWrapper: {
    alignItems: 'center',
    margin: 10,
    paddingBottom: 10,
  },
  item: {
    width: 110, // Ajuste a largura conforme necessário
    height: 110, // Ajuste a altura conforme necessário
    backgroundColor: '#0F2026',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  icon: {
    width: 50, // Ajuste o tamanho do ícone se necessário
    height: 50, // Ajuste o tamanho do ícone se necessário
    resizeMode: 'contain', // Mantém a proporção do ícones
  },
  label: {
    color: 'white',
    fontSize: 18,
    marginTop: 10,
    textAlign: 'center',
  },
});

export default MainScreen;
