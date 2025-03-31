list1 = []  # 1명에 대한 정보 저장 -> 1차원 배열
list2 = []  # 3명에 대한 정보 저장 -> 2차원 배열

# 학생 정보 입력
for i in range(3):
    list1.append(input("이름 :"))
    list1.append(int(input("국어성적 :")))
    list1.append(int(input("영어성적 :")))
    list1.append(int(input("수학성적 :")))
    list2.append(list1)
    list1 = []

# 전체 학생 점수 합과 평균 계산
def print_all_students():
    for i in range(3):
        print("\n%d번째 학생" % (i + 1))
        print("%5s" % list2[i][0], end=" ")
        hap = 0
        for j in range(1, 4, 1):
            print("%.3d" % list2[i][j], end=" ")
            hap += list2[i][j]
        print("--> 합:%3d, 평균:%3.1f \n" % (hap, hap / 3))

    # 전체 학생 점수 합과 평균 출력
    total_sum = 0
    total_count = 0
    for i in range(3):
        for j in range(1, 4):
            total_sum += list2[i][j]
            total_count += 1
    total_avg = total_sum / total_count
    print("\n전체 학생 점수의 합: %d, 평균: %.1f" % (total_sum, total_avg))

def modify_student_score():
    modify = input("\n수정할 학생의 이름을 입력하세요: ")

    # 학생 이름을 확인하여 해당 학생의 성적 수정
    for i in range(3):
        if list2[i][0] == modify:
            print("%s 학생의 성적을 수정합니다." % modify)
            sub = input("수정할 과목을 입력하세요 (국어, 영어, 수학): ").strip()
            new_score = int(input("새로운 점수를 입력하세요: "))

            if sub == "국어":
                list2[i][1] = new_score
            elif sub == "영어":
                list2[i][2] = new_score
            elif sub == "수학":
                list2[i][3] = new_score
            else:
                print("잘못된 과목입니다.")
            break
    else:
        print("학생을 찾을 수 없습니다.")

# 메뉴 반복 출력
while True:
    print("\n--- 메뉴 ---")
    print("1. 전체학생 출력")
    print("2. 특정학생 성적변경")
    print("3. 종료")

    a = input("원하는 작업의 번호를 입력하세요: ")

    if a == '1':
        print_all_students()
    elif a == '2':
        modify_student_score()
    elif a == '3':
        print("프로그램을 종료합니다.")
        break
    else:
        print("잘못된 번호를 입력하셨습니다. 다시 시도하세요.")

