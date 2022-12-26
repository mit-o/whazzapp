from core.settings import firebase_storage, firebase_user
from secrets import token_hex

MAX_AVATAR_SIZE = 1024 * 1024 * 2


class FirebaseStorageHelper:
    def __init__(self, entity_id, path_prefix):
        self.entity_id = entity_id
        self.path_prefix = path_prefix
        self.files = firebase_storage.list_files()

    def delete_old_avatars(self):
        old_avatars = [
            av
            for av in self.files
            if av is not None
            and av.name.startswith(f"{self.path_prefix}/{self.entity_id}_")
        ]
        if len(old_avatars) > 0:
            for old_avatar in old_avatars:
                firebase_storage.delete(old_avatar.name, firebase_user["idToken"])

    def upload_avatar(self, avatar_file):
        file_hash = f"{self.entity_id}_{token_hex(4)}"
        path_to_avatar = f"{self.path_prefix}/{file_hash}"
        firebase_storage.child(path_to_avatar).put(
            avatar_file, firebase_user["idToken"]
        )
        return firebase_storage.child(path_to_avatar).get_url(None)

    def get_default_avatar(self):
        return firebase_storage.child(f"{self.path_prefix}/default.webp").get_url(None)
