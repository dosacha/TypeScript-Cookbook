// type_system.ts

// 같은 기본 형식의 집합을 값으로 갖는 두 가지 다른 형식이 있다면 문제가 생긴다
// ts는 형식 시스템 안에서 명목상 형식 지원을 흉내 내며 더 높은 보안성을 제공한다

// 1.감싸는 클래스 (값을 직접 사용하지 않음)
    class Balance {
        private kind = "balance";
        value: number;

        constructor(value: number){
            this.value = value;
        }
    }

    class AccountNumber {
        private kind = "account";
        value: number;

        constructor(value: number){
            this.value = value;
        }
    }
    // private나 protect 멤버가 있으면 ts는 같은 선언으로부터 이 두 멤버가 왔을 때만 호환된다고 간주한다

// 2. void형식인 _nominal 사용 (사용할 수 없는 멤버를 추가해 클래스를 분리)
    class Balance {
        private _nominal: void = undefined;
        value: number;

        constructor(value: number){
            this.value = value;
        }
    }

    class AccountNumber {
        private _nominal: void = undefined;
        value: number;

        constructor(value: number){
            this.value = value;
        }
    }

    const account = new AccountNumber(12345678);
    const balance = new Balance(10000);

    function acceptBalance(balance: Balance) { /* ... */ }

    acceptBalance(balance); // 동작함
    acceptBalance(account);
    // ^'AccountNumber' 형식의 인수는 'Balance' 형식의 매개 변수에 할당될 수 없습니다.
    //   형식에 별도의 프라이빗 속성 '_nominal' 선언이 있습니다.ts(2345)

// kind 프로퍼티를 포함하는 객체 형식으로 기본 형식의 인터섹션을 만들어 명목상 형식을 흉내내는 방법도 있음
// 이렇게 하면 원래 형식의 모든 동작을 그대로 유지하지만, 다르게 사용하려면 형식 어서션으로 ts에 알려야 함
    type Credits = number & { _kind: "credits" };
    type AccountNumber = number & { _kind: "accountNumber" };

    const account = 12345678 as AccountNumber;
    let balance = 10000 as Credits;
    const amount = 3000 as Credits;

    function increase(balance: Credits, amount: Credits): Credits {
        return (balance + amount) as Credits;
    }

    balance = increase(balance, amount); // 동작함
    balance = increase(balance, account);
    // ^ 'AccountNumber2' 형식의 인수는 'Credits' 형식의 매개 변수에 할당될 수 없습니다.
    //   'AccountNumber2' 형식은 '{ _kind: "credits"; }' 형식에 할당할 수 없습니다.
    // '_kind' 속성의 형식이 호환되지 않습니다.
    //   '"accountNumber"' 형식은 '"credits"' 형식에 할당할 수 없습니다.

// balance와 amount는 원래 의도 대로 동작하지만 다시 숫자를 생성함에 주목하자.
// 따라서 다른 어서션을 추가해야 함
    const result = balance + amount; // result는 number
    const credits = (balance + amount) as Credits; // credits은 Credits