import React, { useState, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Image,
    Modal,
    TextInput,
    Button,
    RefreshControl,
    Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
//expo install expo-image-picker


interface Post {
    id: string;
    user: string;
    status: string;
    image: string;
    createdAt: number;
    likes: number;
    likedByUser: boolean;
}

const PostItem: React.FC<{ item: Post; onImagePress: (uri: string) => void; timeAgo: string; onLikeToggle: (postId: string) => void; onReport: (postId: string) => void; }> = React.memo(({ item, onImagePress, timeAgo, onLikeToggle, onReport }) => (
    <View style={styles.postContainer}>
        <View style={styles.userInfo}>
            <Image
                source={{ uri: 'https://via.placeholder.com/50' }} 
                style={styles.userImage}
            />
            <View style={styles.userInfoContainer}>
                <Text style={styles.username}>{item.user}</Text>
                <Text style={styles.status}>{item.status}</Text>
            </View>
            <View style={styles.actionsContainer}>
                <TouchableOpacity onPress={() => onLikeToggle(item.id)}>
                    <Text style={styles.icon}>{item.likedByUser ? '❤️' : '🤍'}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onReport(item.id)}>
                    <Text style={styles.icon}>🚨</Text>
                </TouchableOpacity>
            </View>
        </View>
        {item.image ? (
            <TouchableOpacity onPress={() => onImagePress(item.image)}>
                <Image source={{ uri: item.image }} style={styles.postImage} resizeMode="contain" />
            </TouchableOpacity>
        ) : null}
        <Text style={styles.timeAgo}>{timeAgo}</Text>
        <Text style={styles.likesCount}>{item.likes} {item.likes === 1 ? 'curtida' : 'curtidas'}</Text>
    </View>
));

const Comunidade: React.FC = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [newPostText, setNewPostText] = useState('');
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [communityPosts, setCommunityPosts] = useState<Post[]>([]);
    const [expandedImageUri, setExpandedImageUri] = useState<string | null>(null);
    const [refreshing, setRefreshing] = useState(false);

    const handleCreatePost = useCallback(() => {
        if (!imageUri) {
            Alert.alert("Erro", "Você precisa selecionar uma imagem para criar um post!");
            return;
        }

        const newPost: Post = {
            id: Math.random().toString(),
            user: 'User123',
            status: newPostText,
            image: imageUri || '',
            createdAt: Date.now(),
            likes: 0,
            likedByUser: false,
        };

        setCommunityPosts((prevPosts) => [newPost, ...prevPosts]);
        setNewPostText('');
        setImageUri(null);
        setModalVisible(false);
    }, [newPostText, imageUri]);

    const renderItem = useCallback(({ item }: { item: Post }) => {
        const timeAgo = calculateTimeAgo(item.createdAt);
        return (
            <PostItem
                item={item}
                onImagePress={setExpandedImageUri}
                timeAgo={timeAgo}
                onLikeToggle={handleLikeToggle}
                onReport={handleReport}
            />
        );
    }, []);

    const handleLikeToggle = (postId: string) => {
        setCommunityPosts((prevPosts) => {
            const postComunidade = prevPosts.findIndex((post) => post.id === postId);
            if (postComunidade === -1) return prevPosts;

            const post = prevPosts[postComunidade];
            const likedByUser = !post.likedByUser;
            const newLikesCount = likedByUser ? post.likes + 1 : post.likes - 1;

            const updatedPost = { ...post, likedByUser, likes: newLikesCount };
            const updatedPosts = [...prevPosts];
            updatedPosts[postComunidade] = updatedPost;

            return updatedPosts;
        });
    };

    const handleReport = (postId: string) => {
        Alert.alert("Denunciar Post", "Você realmente deseja denunciar este post?", [
            { text: "Cancelar", style: "cancel" },
            { text: "Denunciar", onPress: () => alert("Post denunciado!") },
        ]);
    };

    const calculateTimeAgo = (createdAt: number) => {
        const now = Date.now();
        const diffInSeconds = Math.floor((now - createdAt) / 1000);

        if (diffInSeconds < 60) return `${diffInSeconds} segundos atrás`;
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutos atrás`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} horas atrás`;
        return `${Math.floor(diffInSeconds / 86400)} dias atrás`;
    };

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, []);

    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Você precisa permitir o acesso à câmera!");
            return;
        }

        const cameraResult = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [9, 16],
            quality: 1,
        });

        if (!cameraResult.canceled && cameraResult.assets) {
            const takenImage = cameraResult.assets[0];
            setImageUri(takenImage.uri);
        }
    };

    const closeExpandedImage = () => {
        setExpandedImageUri(null);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>COMUNIDADE</Text>
            <FlatList
                data={communityPosts}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                initialNumToRender={5}
                maxToRenderPerBatch={10}
                windowSize={5}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.flatListContent}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            />
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Criar Novo Post</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Escreva seu post aqui..."
                            placeholderTextColor="#A0A0A0"
                            value={newPostText}
                            onChangeText={setNewPostText}
                        />
                        <TouchableOpacity style={styles.cameraButton} onPress={pickImage}>
                            <Text style={styles.buttonText}>Abrir Câmera</Text>
                        </TouchableOpacity>
                        {imageUri && (
                            <Image source={{ uri: imageUri }} style={styles.selectedImage} />
                        )}
                        <View style={styles.buttonSpacing}>
                            <TouchableOpacity style={styles.createPostButton} onPress={handleCreatePost}>
                                <Text style={styles.buttonText}>Criar Post</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Text style={styles.closeModalText}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Modal
                visible={!!expandedImageUri}
                transparent={true}
                animationType="fade"
                onRequestClose={closeExpandedImage}
            >
                <TouchableOpacity style={styles.imageOverlay} onPress={closeExpandedImage}>
                    {expandedImageUri && (
                        <Image
                            source={{ uri: expandedImageUri }}
                            style={styles.fullScreenImage}
                            resizeMode="contain"
                        />
                    )}
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#17272e',
      padding: 20,
  },
  header: {
      fontSize: 24,
      color: '#fff',
      fontWeight: 'bold',
      marginBottom: 20,
  },
  postContainer: {
      marginBottom: 20,
      backgroundColor: '#0F2026',
      borderRadius: 10,
      padding: 15,
      width: '100%',
      height: 570,
  },
  userInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
  },
  userInfoContainer: {
      flex: 1,
      marginLeft: 10,
  },
  username: {
      fontSize: 16,
      color: '#fff',
      fontWeight: 'bold',
  },
  status: {
      fontSize: 14,
      color: '#A0A0A0',
  },
  actionsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
  },
  icon: {
      fontSize: 24,
      marginHorizontal: 5,
  },
  postImage: {
      width: '100%',
      height: 400,
      borderRadius: 10,
      marginVertical: 20,
  },
  userImage: {
      width: 50,
      height: 50,
      borderRadius: 25,
  },
  timeAgo: {
      fontSize: 14,
      color: '#A0A0A0',
  },
  likesCount: {
      fontSize: 14,
      color: '#A0A0A0',
      marginTop: 5,
  },
  addButton: {
      position: 'absolute',
      bottom: 30,
      right: 30,
      backgroundColor: '#E7B12C',
      borderRadius: 50,
      width: 60,
      height: 60,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 3,
      paddingVertical: 15, 
  },
  addButtonText: {
      color: '#fff',
      fontSize: 36,
      lineHeight: 36,
  },
  modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  modalContent: {
      width: '90%', 
      backgroundColor: '#122329',
      borderRadius: 10,
      padding: 30,
      elevation: 5,
      justifyContent: 'center',
      alignItems: 'center',
  },
  modalTitle: {
      fontSize: 22, 
      marginBottom: 15,
      color: '#FFF', 
      fontWeight: 'bold',
  },
  textInput: {
      height: 45,
      borderColor: '#E7B12C',
      borderWidth: 1,
      borderRadius: 5,
      marginBottom: 15,
      paddingHorizontal: 10,
      backgroundColor: '#2A2A2A', 
      color: '#FFF',
  },
  selectedImage: {
      width: '100%',
      height: 500, 
      marginVertical: 10,
      borderRadius: 10,
      borderColor: '#E7B12C',
      borderWidth: 2,
  },
  buttonSpacing: {
      marginVertical: 15,
  },
  closeModalText: {
      color: '#ffff',
      marginTop: 15,
      textAlign: 'center',
      fontWeight: 'bold', 
  },
  imageOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.7)',
      justifyContent: 'center',
      alignItems: 'center',
  },
  fullScreenImage: {
      width: '100%',
      height: '100%',
  },
  flatListContent: {
      paddingBottom: 100,
  },
  cameraButton: {
  backgroundColor: '#E7B12C',
  borderRadius: 5,
  padding: 15,
  alignItems: 'center',
  marginBottom: 15,
},
createPostButton: {
  backgroundColor: '#E7B12C',
  borderRadius: 5,
  padding: 15,
  alignItems: 'center',
},
buttonText: {
  color: '#fff',
  fontWeight: 'bold', 
},

});


export default Comunidade;
