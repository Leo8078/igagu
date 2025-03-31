class User:
    def __init__(self, name, phone):
        self.name = name
        self.phone = phone

    def __str__(self):
        return f"이름: {self.name}   전화번호: {self.phone}"


class PhoneBook:
    def __init__(self):
        self.phone_book = []

    # 중복체크 후 신규 사용자 추가
    def add_user(self, name, phone):
        if self.find_user(name) is not None:
            print("이미 저장된 이름입니다.")
            return
        new_user = User(name, phone)
        self.phone_book.append(new_user)

    # 특정 사용자의 위치 찾기
    def find_user(self, name):
        for user in self.phone_book:
            if user.name == name:
                return user
        return None

    # 이름으로 검색하여 전화번호 수정
    def edit_user(self, name, new_phone):
        user = self.find_user(name)
        if user is None:
            print("해당 정보가 존재하지 않습니다.")
            return
        user.phone = new_phone
        print(f"{name}의 전화번호가 {new_phone}로 수정되었습니다.")

    # 특정 사용자 삭제
    def delete_user(self, name):
        user = self.find_user(name)
        if user is None:
            print("해당 정보가 존재하지 않습니다.")
            return
        self.phone_book.remove(user)
        print(f"{name}의 정보가 삭제되었습니다.")

    # 전체 전화번호 출력
    def print_all_users(self):
        if not self.phone_book:
            print("저장된 전화번호부가 없습니다.")
            return
        print("*" * 10, "전화번호부", "*" * 10)
        for user in self.phone_book:
            print(user)
        print("*" * 32)


class PhoneBookManager:
    def __init__(self):
        self.phone_book = PhoneBook()

    def menu(self):
        while True:
            choice = input("사용자 추가(n), 수정(e), 삭제(d), 전체 출력(p), 종료(q) : ")

            if choice == 'n':
                name = input("이름: ")
                phone = input("전화번호: ")
                self.phone_book.add_user(name, phone)
            elif choice == 'e':
                name = input("수정할 사용자의 이름을 입력하세요 : ")
                new_phone = input("수정할 전화번호 입력 : ")
                self.phone_book.edit_user(name, new_phone)
            elif choice == 'd':
                name = input("삭제할 사용자의 이름을 입력하세요 : ")
                self.phone_book.delete_user(name)
            elif choice == 'p':
                self.phone_book.print_all_users()
            elif choice == 'q':
                break
            else:
                print("다시 입력하세요.")

        print("\n프로그램을 종료합니다.")


# main part
if __name__ == '__main__':
    manager = PhoneBookManager()
    manager.menu()

