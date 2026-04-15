export default {
  id: "m8",
  icon: "🪝",
  title: {
    es: "Introducción a smart contracts en entornos No-EVM",
    en: "Introduction to smart contracts in Non-EVM environments",
    jp: "Non-EVM環境におけるスマートコントラクト入門",
    ko: "비 EVM 환경의 스마트 컨트랙트 입문",
    zh: "非 EVM 环境中的智能合约入门",
  },
  lessons: [
    {
      id: "m8l1",
      title: {
        es: "¿Qué son los Hooks?",
        en: "What are Hooks?",
        jp: "Hooksとは何か？",
        ko: "Hooks란 무엇인가?",
        zh: "什么是 Hooks？",
      },
      theory: {
        es: `Los **Hooks** son el sistema de smart contracts nativo de Xahau. A diferencia de Solidity en Ethereum, los Hooks se escriben en **C** y se compilan a **WebAssembly (WASM)**.

### Hooks vs Smart Contracts EVM

| Característica | Smart Contracts EVM | Hooks (Xahau) |
|---|---|---|
| Lenguaje | Solidity / Vyper | C |
| Compilación | Bytecode EVM | WebAssembly (WASM) |
| Ejecución | En la EVM | Directamente en el nodo |
| Modelo | Se invocan activamente | Se ejecutan reactivamente |
| Gas/Fees | Gas variable | Fees fijos y bajos |
| Almacenamiento | Storage ilimitado | Estado con namespace |
| Despliegue | Transacción de creación | Transacción SetHook |

### Modelo reactivo

La diferencia más importante es el **modelo de ejecución**:

- En Ethereum, **tú llamas** al smart contract enviando una transacción al contrato
- En Xahau, los Hooks se **ejecutan automáticamente** cuando una transacción pasa por una cuenta que tiene un Hook instalado

Los Hooks son como **filtros** o **interceptores** que reaccionan a las transacciones. Entre muchas opciones, pueden:
- **Aceptar** la transacción (\`accept()\`)
- **Rechazar** la transacción (\`rollback()\`)
- **Emitir** nuevas transacciones (\`emit()\`)
- **Leer y escribir** estado persistente (\`state()\`, \`state_set()\`)

### Algunas datos curiosos

- Máximo **10 Hooks** por cuenta
- Cada Hook tiene su propio **namespace** para guardar información, pero puede utilizar otros que no son el propio  si tiene permisos
- La primera vez que se instala un Hook, el código WASM se almacena en el ledger y se le asigna un hash. Si otro usuario quiere instalar el mismo Hook, puede hacer uso del identificador y no necesita tener acceso al código fuente para instalarlo.

### Funciones obligatorias

Todo Hook debe implementar dos funciones:
- \`hook(uint32_t reserved)\` — Se ejecuta cuando una transacción llega a la cuenta. Es obligatoria
- \`cbak(uint32_t reserved)\` — Se ejecuta como callback de transacciones emitidas por el Hook. Es opcional

### Guard (\`_g\`)

Cada Hook debe incluir una llamada a \`_g(id, maxiter)\` para evitar bucles infinitos. El guard define el máximo de iteraciones que puede ejecutar el Hook.`,
        en: `Hooks are Xahau's native smart contract system. Unlike Solidity in Ethereum, Hooks are written in **C** and compiled to **WebAssembly (WASM)**.

### Hooks vs EVM Smart Contracts

| Feature | EVM Smart Contracts | Hooks (Xahau) |
|---|---|---|
| Language | Solidity / Vyper | C |
| Compilation | EVM Bytecode | WebAssembly (WASM) |
| Execution | On the EVM | Directly on the node |
| Model | Actively invoked | Reactively executed |
| Gas/Fees | Variable gas | Fixed low fees |
| Storage | Unlimited storage | State with namespace |
| Deployment | Creation transaction | SetHook transaction |

### Reactive model

The most important difference is the **execution model**:

- In Ethereum, **you call** the smart contract by sending a transaction to the contract
- In Xahau, Hooks **execute automatically** when a transaction passes through an account that has a Hook installed

Hooks are like **filters** or **interceptors** that react to transactions. Among many options, they can:
- **Accept** the transaction (\`accept()\`)
- **Reject** the transaction (\`rollback()\`)
- **Emit** new transactions (\`emit()\`)
- **Read and write** persistent state (\`state()\`, \`state_set()\`)

### Some interesting facts

- Maximum **10 Hooks** per account
- Each Hook has its own **namespace** for storing information, but can use others that aren't its own if it has permissions
- The first time a Hook is installed, the WASM code is stored in the ledger and assigned a hash. If another user wants to install the same Hook, they can use the identifier and don't need access to the source code to install it.

### Mandatory functions

Every Hook must implement two functions:
- \`hook(uint32_t reserved)\` — Executes when a transaction reaches the account. Mandatory
- \`cbak(uint32_t reserved)\` — Executes as a callback for transactions emitted by the Hook. Optional

### Guard (\`_g\`)

Every Hook must include a call to \`_g(id, maxiter)\` to prevent infinite loops. The guard defines the maximum number of iterations the Hook can execute.`,
        jp: `**Hooks**はXahauのネイティブスマートコントラクトシステムです。EthereumのSolidityとは異なり、Hooksは**C言語**で記述され、**WebAssembly（WASM）**にコンパイルされます。

### Hooks vs EVMスマートコントラクト

| 特徴 | EVMスマートコントラクト | Hooks（Xahau） |
|---|---|---|
| 言語 | Solidity / Vyper | C |
| コンパイル | EVMバイトコード | WebAssembly（WASM） |
| 実行 | EVM上で | ノード上で直接 |
| モデル | 能動的に呼び出す | リアクティブに実行 |
| ガス/手数料 | 可変ガス | 固定の低手数料 |
| ストレージ | 無制限ストレージ | 名前空間付きステート |
| デプロイ | 作成トランザクション | SetHookトランザクション |

### リアクティブモデル

最も重要な違いは**実行モデル**です。

- Ethereumでは、コントラクトにトランザクションを送ることで**あなたがスマートコントラクトを呼び出す**
- Xahauでは、Hookがインストールされたアカウントにトランザクションが通過するとき、Hooksが**自動的に実行される**

Hooksはトランザクションに反応する**フィルター**や**インターセプター**のようなものです。多くのオプションの中で、次のようなことができます。
- トランザクションを**承認**する（\`accept()\`）
- トランザクションを**拒否**する（\`rollback()\`）
- 新しいトランザクションを**発行**する（\`emit()\`）
- 永続的なステートを**読み書き**する（\`state()\`、\`state_set()\`）

### 興味深い事実

- アカウントあたり最大**10個のHooks**
- 各Hookには情報を保存するための独自の**名前空間**があるが、権限があれば自分以外の名前空間にもアクセスできる
- Hookが初めてインストールされると、WASMコードがレジャーに保存されてハッシュが割り当てられる。別のユーザーが同じHookをインストールしたい場合、識別子を使用できるため、インストールするためにソースコードへのアクセスは不要

### 必須関数

すべてのHookは次の2つの関数を実装する必要があります。
- \`hook(uint32_t reserved)\` — アカウントにトランザクションが到着したときに実行される。必須
- \`cbak(uint32_t reserved)\` — Hookが発行したトランザクションのコールバックとして実行される。任意

### ガード（\`_g\`）

すべてのHookは無限ループを防ぐために\`_g(id, maxiter)\`の呼び出しを含む必要があります。ガードはHookが実行できる最大反復回数を定義します。`,
        ko: `**Hook**은 Xahau 계정에 설치되는 가벼운 스마트 컨트랙트입니다. Ethereum의 Solidity와 달리 Hook은 **C 언어**로 작성되고 **WebAssembly(WASM)** 로 컴파일됩니다.

### Hook의 특징

- 계정 단위로 설치
- 트랜잭션을 **수락**하거나 **거부**할 수 있음
- 영속 상태를 읽고 쓸 수 있음
- 필요하면 새 트랜잭션을 발행할 수 있음

### 핵심 차이

가장 큰 차이는 **실행 방식**입니다.

- Ethereum에서는 사용자가 컨트랙트를 호출합니다
- Xahau에서는 Hook이 설치된 계정을 지나는 트랜잭션에 반응해 자동 실행됩니다

### 필수 함수

- \`hook(uint32_t reserved)\`: 필수
- \`cbak(uint32_t reserved)\`: 선택

### Guard

모든 Hook은 무한 루프를 방지하기 위해 \`_g(id, maxiter)\` 를 포함해야 합니다.`,
        zh: `**Hook** 是安装在 Xahau 账户上的轻量级智能合约。与 Ethereum 的 Solidity 不同，Hook 使用 **C 语言** 编写，并编译为 **WebAssembly（WASM）**。

### Hook 的特点

- 以账户为单位安装
- 可以接受或拒绝交易
- 可以读写持久状态
- 在需要时还能自行发出新交易

### 核心差异

最大的区别在于**执行方式**：

- 在 Ethereum 中，用户主动调用合约
- 在 Xahau 中，交易经过安装了 Hook 的账户时，Hook 会自动响应执行

### 必要函数

- \`hook(uint32_t reserved)\`：必需
- \`cbak(uint32_t reserved)\`：可选

### Guard

所有 Hook 都必须包含 \`_g(id, maxiter)\`，用于防止无限循环。`,
      },
      codeBlocks: [
        {
          title: {
            es: "Hook mínimo. Acepta todas las transacciones",
            en: "Minimal Hook. Accepts all transactions",
            jp: "最小限のHook。すべてのトランザクションを承認する",
            ko: "최소 Hook. 모든 트랜잭션 수락",
            zh: "最小 Hook：接受所有交易",
          },
          language: "c",
          code: {
            es: `#include "hookapi.h"

/**
 * Hook: accept_all.c
 * El Hook más simple posible.
 * Acepta todas las transacciones sin condiciones.
 */

int64_t hook(uint32_t reserved) {
    // Aceptar la transacción con un mensaje
    accept(SBUF("accept_all: Transacción aceptada."), __LINE__);

    // Guard: nunca se llega aquí, pero es obligatorio
    _g(1, 1);
    return 0;
}`,
            en: `#include "hookapi.h"

/**
 * Hook: accept_all.c
 * The simplest possible Hook.
 * Accepts all transactions without conditions.
 */

int64_t hook(uint32_t reserved) {
    // Accept the transaction with a message
    accept(SBUF("accept_all: Transaction accepted."), __LINE__);

    // Guard: never reached here, but mandatory
    _g(1, 1);
    return 0;
}`,
            jp: `#include "hookapi.h"

/**
 * Hook: accept_all.c
 * 最もシンプルなHook。
 * すべてのトランザクションを条件なく承認する。
 */

int64_t hook(uint32_t reserved) {
    // メッセージ付きでトランザクションを承認する
    accept(SBUF("accept_all: トランザクション承認済み。"), __LINE__);

    // ガード：ここには到達しないが、必須
    _g(1, 1);
    return 0;
}`,
            ko: `#include "hookapi.h"

/**
 * Hook: accept_all.c
 * 가장 단순한 Hook 예제.
 * 모든 트랜잭션을 조건 없이 수락한다.
 */

int64_t hook(uint32_t reserved) {
    // 메시지와 함께 트랜잭션 수락
    accept(SBUF("accept_all: 트랜잭션이 수락되었습니다."), __LINE__);

    // Guard: 여기에는 도달하지 않지만 필수
    _g(1, 1);
    return 0;
}`,
            zh: `#include "hookapi.h"

/**
 * Hook: accept_all.c
 * 最简单的 Hook 示例。
 * 无条件接受所有交易。
 */

int64_t hook(uint32_t reserved) {
    // 带消息接受交易
    accept(SBUF("accept_all: 交易已接受。"), __LINE__);

    // Guard：虽然这里不会执行到，但它是必需的
    _g(1, 1);
    return 0;
}`,
          },
        },
        {
          title: {
            es: "Hook que rechaza pagos menores a un mínimo",
            en: "Hook that rejects payments below a minimum",
            jp: "最低金額未満の支払いを拒否するHook",
            ko: "최소 금액 미만 결제를 거부하는 Hook",
            zh: "拒绝低于最小金额付款的 Hook",
          },
          language: "c",
          code: {
            es: `#include "hookapi.h"

/**
 * Hook: min_payment.c
 * Rechaza pagos de XAH menores a 10 XAH.
 * Acepta todas las demás transacciones.
 */

int64_t hook(uint32_t reserved) {
    // Obtener el tipo de transacción
    int64_t tt = otxn_type();

    // Si no es un pago (tipo 0), aceptar
    if (tt != 0) {
        accept(SBUF("min_payment: No es un pago."), __LINE__);
    }

    // Obtener la cantidad del pago
    unsigned char amount_buf[48];
    int64_t amount_len = otxn_field(SBUF(amount_buf), sfAmount);

    // Si no es XAH nativo (8 bytes), aceptar
    if (amount_len != 8) {
        accept(SBUF("min_payment: Pago no-XAH."), __LINE__);
    }

    // Convertir a drops y comparar
    int64_t drops = AMOUNT_TO_DROPS(amount_buf);
    int64_t min_drops = 10000000; // 10 XAH = 10,000,000 drops

    if (drops < min_drops) {
        // Rechazar: el pago es muy pequeño
        rollback(
            SBUF("min_payment: Pago rechazado. Mínimo 10 XAH."),
            __LINE__
        );
    }

    // Aceptar: el pago cumple el mínimo
    accept(SBUF("min_payment: Pago aceptado."), __LINE__);

    _g(1, 1);
    return 0;
}`,
            en: `#include "hookapi.h"

/**
 * Hook: min_payment.c
 * Reject payments of XAH below 10 XAH.
 * Accepts all other transactions.
 */

int64_t hook(uint32_t reserved) {
    // Obtain the transaction type
    int64_t tt = otxn_type();

    // If not a payment (type 0), accept
    if (tt != 0) {
        accept(SBUF("min_payment: Not a payment."), __LINE__);
    }

    // Obtain the payment amount
    unsigned char amount_buf[48];
    int64_t amount_len = otxn_field(SBUF(amount_buf), sfAmount);

    // If not native XAH (8 bytes), accept
    if (amount_len != 8) {
        accept(SBUF("min_payment: Not native XAH."), __LINE__);
    }

    // Convert to drops and compare
    int64_t drops = AMOUNT_TO_DROPS(amount_buf);
    int64_t min_drops = 10000000; // 10 XAH = 10,000,000 drops

    if (drops < min_drops) {
        // Reject: the payment is too small
        rollback(
            SBUF("min_payment: Payment rejected. Minimum 10 XAH."),
            __LINE__
        );
    }

    // Accept: the payment meets the minimum
    accept(SBUF("min_payment: Payment accepted."), __LINE__);

    _g(1, 1);
    return 0;
}`,
            jp: `#include "hookapi.h"

/**
 * Hook: min_payment.c
 * 10 XAH未満のXAH支払いを拒否する。
 * その他すべてのトランザクションを承認する。
 */

int64_t hook(uint32_t reserved) {
    // トランザクションタイプを取得する
    int64_t tt = otxn_type();

    // 支払いでない場合（タイプ0）、承認する
    if (tt != 0) {
        accept(SBUF("min_payment: 支払いではありません。"), __LINE__);
    }

    // 支払い金額を取得する
    unsigned char amount_buf[48];
    int64_t amount_len = otxn_field(SBUF(amount_buf), sfAmount);

    // ネイティブXAHでない場合（8バイト）、承認する
    if (amount_len != 8) {
        accept(SBUF("min_payment: ネイティブXAHではありません。"), __LINE__);
    }

    // dropsに変換して比較する
    int64_t drops = AMOUNT_TO_DROPS(amount_buf);
    int64_t min_drops = 10000000; // 10 XAH = 10,000,000 drops

    if (drops < min_drops) {
        // 拒否：支払い金額が少なすぎる
        rollback(
            SBUF("min_payment: 支払い拒否。最低10 XAH必要。"),
            __LINE__
        );
    }

    // 承認：支払いが最低金額を満たしている
    accept(SBUF("min_payment: 支払い承認済み。"), __LINE__);

    _g(1, 1);
    return 0;
}`,
            ko: `#include "hookapi.h"

/**
 * Hook: min_payment.c
 * 10 XAH 미만의 XAH 결제를 거부한다.
 * 그 외 트랜잭션은 모두 수락한다.
 */

int64_t hook(uint32_t reserved) {
    // 트랜잭션 타입 확인
    int64_t tt = otxn_type();

    // 결제가 아니면 수락
    if (tt != 0) {
        accept(SBUF("min_payment: 결제 트랜잭션이 아닙니다."), __LINE__);
    }

    // 결제 금액 읽기
    unsigned char amount_buf[48];
    int64_t amount_len = otxn_field(SBUF(amount_buf), sfAmount);

    // 네이티브 XAH가 아니면 수락
    if (amount_len != 8) {
        accept(SBUF("min_payment: 네이티브 XAH가 아닙니다."), __LINE__);
    }

    // drops 단위로 변환 후 비교
    int64_t drops = AMOUNT_TO_DROPS(amount_buf);
    int64_t min_drops = 10000000; // 10 XAH = 10,000,000 drops

    if (drops < min_drops) {
        rollback(
            SBUF("min_payment: 결제가 거부되었습니다. 최소 10 XAH 필요."),
            __LINE__
        );
    }

    accept(SBUF("min_payment: 결제가 수락되었습니다."), __LINE__);

    _g(1, 1);
    return 0;
}`,
            zh: `#include "hookapi.h"

/**
 * Hook: min_payment.c
 * 拒绝低于 10 XAH 的 XAH 付款。
 * 其他交易全部接受。
 */

int64_t hook(uint32_t reserved) {
    // 读取交易类型
    int64_t tt = otxn_type();

    // 如果不是 Payment（类型 0），直接接受
    if (tt != 0) {
        accept(SBUF("min_payment: 这不是付款交易。"), __LINE__);
    }

    // 读取付款金额
    unsigned char amount_buf[48];
    int64_t amount_len = otxn_field(SBUF(amount_buf), sfAmount);

    // 如果不是原生 XAH（8 字节），直接接受
    if (amount_len != 8) {
        accept(SBUF("min_payment: 不是原生 XAH。"), __LINE__);
    }

    // 转换为 drops 并比较
    int64_t drops = AMOUNT_TO_DROPS(amount_buf);
    int64_t min_drops = 10000000; // 10 XAH = 10,000,000 drops

    if (drops < min_drops) {
        rollback(
            SBUF("min_payment: 付款被拒绝，最低为 10 XAH。"),
            __LINE__
        );
    }

    accept(SBUF("min_payment: 付款已接受。"), __LINE__);

    _g(1, 1);
    return 0;
}`,
          },
        },
      ],
      slides: [
        {
          title: { es: "Hooks vs Smart Contracts EVM", en: "Hooks vs EVM Smart Contracts", jp: "Hooks vs EVMスマートコントラクト", ko: "Hooks vs EVM 스마트 컨트랙트", zh: "Hooks vs EVM 智能合约" },
          content: {
            es: "Smart contracts nativos de Xahau\n\n• Escritos en C, compilados a WebAssembly\n• Modelo reactivo (no se invocan, reaccionan)\n• Fees fijos y bajos (no gas variable)\n• Estado aislado con namespaces\n• Despliegue con transacción SetHook",
            en: "Xahau native smart contracts\n\n• Written in C, compiled to WebAssembly\n• Reactive model (not invoked, they react)\n• Fixed low fees (no variable gas)\n• Isolated state with namespaces\n• Deployment with SetHook transaction",
            jp: "Xahauのネイティブスマートコントラクト\n\n• C言語で記述、WebAssemblyにコンパイル\n• リアクティブモデル（呼び出しではなく反応）\n• 固定の低手数料（可変ガスなし）\n• 名前空間による分離されたステート\n• SetHookトランザクションでデプロイ",
            ko: "Xahau의 네이티브 스마트 컨트랙트\n\n• C로 작성하고 WebAssembly로 컴파일\n• 호출형이 아닌 반응형 실행 모델\n• 가변 가스 대신 고정되고 낮은 수수료\n• namespace로 분리된 상태\n• SetHook 트랜잭션으로 배포",
            zh: "Xahau 的原生智能合约\n\n• 用 C 编写并编译为 WebAssembly\n• 采用响应式执行模型，而不是主动调用\n• 费用固定且较低，不使用可变 Gas\n• 使用 namespace 隔离状态\n• 通过 SetHook 交易部署",
          },
          visual: "🪝",
        },
        {
          title: { es: "Modelo reactivo y funciones", en: "Reactive model and functions", jp: "リアクティブモデルと関数", ko: "반응형 모델과 함수", zh: "响应式模型与函数" },
          content: {
            es: "EVM: Tú llamas al contrato\nHooks: Se ejecutan automáticamente\n\n• accept() → Aceptar transacción\n• rollback() → Rechazar transacción\n• emit() → Emitir nueva transacción\n• state() / state_set() → Estado persistente\n\nhook() obligatoria | cbak() opcional | _g() guard",
            en: "EVM: You call the contract\nHooks: Execute automatically\n\n• accept() → Accept transaction\n• rollback() → Reject transaction\n• emit() → Emit new transaction\n• state() / state_set() → Persistent state\n\nhook() mandatory | cbak() optional | _g() guard",
            jp: "EVM：あなたがコントラクトを呼び出す\nHooks：自動的に実行される\n\n• accept() → トランザクションを承認\n• rollback() → トランザクションを拒否\n• emit() → 新しいトランザクションを発行\n• state() / state_set() → 永続的なステート\n\nhook() 必須 | cbak() 任意 | _g() ガード",
            ko: "EVM: 사용자가 컨트랙트를 호출\nHooks: 트랜잭션에 반응해 자동 실행\n\n• accept() → 트랜잭션 수락\n• rollback() → 트랜잭션 거부\n• emit() → 새 트랜잭션 발행\n• state() / state_set() → 영속 상태\n\nhook() 필수 | cbak() 선택 | _g() guard",
            zh: "EVM：由用户调用合约\nHooks：对交易自动作出响应\n\n• accept() → 接受交易\n• rollback() → 拒绝交易\n• emit() → 发出新交易\n• state() / state_set() → 持久状态\n\nhook() 必需 | cbak() 可选 | _g() 为 guard",
          },
          visual: "⚡",
        },
        {
          title: { es: "Datos clave sobre Hooks", en: "Key facts about Hooks", jp: "Hooksの主要な事実", ko: "Hooks 핵심 정보", zh: "Hooks 关键事实" },
          content: {
            es: "• Hasta 10 Hooks por cuenta\n• Cada Hook tiene su propio namespace\n• Puede acceder a namespaces ajenos con permisos\n• WASM deduplicado: mismo codigo = mismo hash\n• Instalar por HookHash sin acceso al codigo fuente",
            en: "• Up to 10 Hooks per account\n• Each Hook has its own namespace\n• Can access other namespaces with permissions\n• WASM deduplicated: same code = same hash\n• Install by HookHash without source code access",
            jp: "• アカウントあたり最大10個のHooks\n• 各Hookには独自の名前空間がある\n• 権限があれば他の名前空間にもアクセス可能\n• WASMの重複排除：同じコード = 同じハッシュ\n• ソースコードなしでHookHashによりインストール可能",
            ko: "• 계정당 최대 10개의 Hook\n• 각 Hook은 자체 namespace를 가짐\n• 권한이 있으면 다른 namespace도 접근 가능\n• 같은 WASM은 같은 해시로 중복 제거됨\n• 소스코드 없이 HookHash로 설치 가능",
            zh: "• 每个账户最多可安装 10 个 Hook\n• 每个 Hook 都有自己的 namespace\n• 有权限时也可以访问其他 namespace\n• 相同 WASM 会被去重，对应相同哈希\n• 可通过 HookHash 安装，无需源码",
          },
          visual: "📐",
        },
      ],
    },
    {
      id: "m8l2",
      title: {
        es: "Despliegue de un Hook en Xahau",
        en: "Deploying a Hook on Xahau",
        jp: "XahauへのHookのデプロイ",
        ko: "Xahau에 Hook 배포하기",
        zh: "在 Xahau 上部署 Hook",
      },
      theory: {
        es: `Una vez que tienes tu Hook escrito en C, necesitas **compilarlo a WebAssembly** y **desplegarlo** en tu cuenta de Xahau mediante una transacción \`SetHook\`.

### Opciones de desarrollo

**1. Hooks Builder (Online)**
La forma más rápida de empezar. [builder.xahau.network](https://builder.xahau.network) te permite escribir, compilar y desplegar Hooks desde el navegador. Incluye ejemplos, documentación y un entorno de desarrollo integrado. Ideal para pruebas rápidas y aprendizaje. Solo disponible para **Xahau Testnet**.

**2. Desarrollo local**
Para desarrollo local (y posteriormente Xahau Mainnet) necesitas [hooks-toolkit](https://hooks-toolkit.com/), incluye una librería completa para poder compilar tus hooks y desplegarlos con scripts personalizados.

### Desplegar un Hook

Una vez que tienes un hook listo para desplegar, el proceso general es generar una transacción \`SetHook\` con los campos adecuados, firmarla y enviarla a la red. El campo principal para el código del Hook es \`CreateCode\`, donde debes incluir el binario WASM en formato hexadecimal si es la primera vez que este Hook va a existir en la red.

Los entornos de prueba como [Hooks Builder](https://builder.xahau.network) te permiten compilar el código y subirlo usando un interfaz gráfico. Existen otros entornos graficos para tanto Xahau Testnet como Mainnnet, que te obligarán a usar tu seed para firmar la transacción de despliegue, como [xahau-testnet.xrplwin.com/tools](https://xahau-testnet.xrplwin.com/tools). Solo se recomienda utilizarlos en entorno de pruebas. Como práctica habitual, se recomienda aprender a utilizar la transacción \`SetHook\` con scripts personalizados usando la librería de \`xahau js\`, para posteriormente poder automatizar despliegues, actualizaciones y gestión de Hooks en producción.

### Transacción SetHook

La transacción \`SetHook\` es la única transacción necesaria para gestionar Hooks. Con ella puedes **instalar**, **actualizar** y **eliminar** Hooks de tu cuenta. Los campos principales del objeto Hook dentro del array \`Hooks\` son:

| Campo | Descripción |
|---|---|
| \`CreateCode\` | El binario WASM del Hook (en hexadecimal) |
| \`HookHash\` | Hash del Hook ya existente en el ledger (alternativa a CreateCode) |
| \`HookOn\` | Cadena que define qué tipos de transacción activan el Hook |
| \`HookNamespace\` | Nombre para el estado del Hook (32 bytes hex) |
| \`HookApiVersion\` | Versión de la API de Hooks (actualmente 0) |
| \`HookParameters\` | Parámetros de configuración opcionales |
| \`HookCanEmit\` | Lista de transacciones que el Hook puede emitir (seguridad) |
| \`Flags\` | Flags de control (\`hsfOverride\`, \`hsfNSDelete\`, \`hsfCollect\`) |

### Fases de gestión de un Hook

### 1. Instalar un Hook por primera vez (con CreateCode)

Cuando despliegas un Hook nuevo que nunca ha existido en la red, usas el campo \`CreateCode\` con el binario WASM completo. El nodo calcula el hash del WASM y almacena el código en el ledger. Si otro usuario ya desplegó el mismo código exacto, Xahau reutiliza la definición existente (deduplicación automática).

\`\`\`
Hook: {
  CreateCode: "0061736D...",     // WASM en hex
  HookOn: "0000000000000000",    // Todos los tipos de tx
  HookNamespace: "00...00",      // 64 chars hex
  HookApiVersion: 0,
  Flags: 1,                      // hsfOverride
}
\`\`\`

### 2. Instalar un Hook existente por HookHash

Si un Hook ya fue desplegado antes (por ti o por otra cuenta), puedes instalarlo en tu cuenta **sin enviar todo el WASM otra vez**. Solo necesitas el \`HookHash\` (el hash SHA-256 del binario). Esto ahorra espacio y fees.

\`\`\`
Hook: {
  HookHash: "A5B6C7D8...",      // Hash del Hook existente
  HookOn: "0000000000000000",
  HookNamespace: "00...00",
  Flags: 1,                      // hsfOverride
}
\`\`\`

El \`HookHash\` lo puedes obtener consultando los Hooks de una cuenta con \`account_objects\` o desde un explorador de bloques como [xahau-testnet.xrplwin.com](https://xahau-testnet.xrplwin.com).

### 3. Actualizar un Hook (Update Operation)

La operación de actualización se activa cuando el Hook ya existe en la posición, **no** se envía \`HookHash\` ni \`CreateCode\`, y se incluye al menos uno de estos campos: \`HookNamespace\`, \`HookParameters\` o \`HookGrants\`. Esto permite modificar la configuración del Hook **sin reemplazar el código WASM**.

**Lo que puedes modificar**:

- **HookNamespace**: Si envías un \`HookNamespace\` diferente al actual, el namespace del Hook se actualiza. Si además incluyes el flag \`hsfNSDelete\` (valor 2), **todas las entradas de estado del namespace anterior se eliminan**.
- **HookParameters**: Para cada entrada en \`HookParameters\`:
  - Si envías un parámetro con nombre y **sin valor**, ese parámetro se **elimina** del Hook
  - Si envías un parámetro con nombre **y valor**, se **añade o actualiza** ese parámetro
- **HookGrants**: Si incluyes \`HookGrants\`, el array completo de grants del Hook se **reemplaza** por el nuevo array proporcionado

\`\`\`
// Ejemplo: actualizar solo los parámetros de un Hook existente
Hook: {
  HookParameters: [
    {
      HookParameter: {
        HookParameterName: "4D494E",        // "MIN"
        HookParameterValue: "00E1F505"      // Nuevo valor
      }
    },
    {
      HookParameter: {
        HookParameterName: "4D4158",        // "MAX" — eliminar
        // Sin HookParameterValue = se elimina
      }
    }
  ]
}
\`\`\`

**Para reemplazar completamente un Hook** por otro código WASM diferente, envía un nuevo \`SetHook\` con \`CreateCode\` (o \`HookHash\`) en la misma posición y el flag \`hsfOverride\` (valor 1). El estado previo del Hook se **mantiene** si el namespace no cambia.

### 4. Eliminar un Hook (Delete Operation)

Para eliminar un Hook de una posición, deben cumplirse estas condiciones: el Hook debe existir en esa posición, el flag \`hsfOverride\` debe estar activo, **no** se envía \`HookHash\`, y \`CreateCode\` debe estar presente pero **vacío**:

\`\`\`
Hook: {
  CreateCode: "",       // Vacío = eliminar
  Flags: 1,             // hsfOverride
}
\`\`\`

Al eliminar:
- El **contador de referencias** del \`HookDefinition\` se decrementa. Si llega a cero (ninguna otra cuenta usa ese código), la definición se elimina del ledger
- El objeto Hook en esa posición se **elimina**, dejando la posición vacía

Si además quieres **limpiar todo el estado** del namespace de ese Hook, añade el flag \`hsfNSDelete\` (valor 2) combinado con \`hsfOverride\`: \`Flags: 3\`. Esto eliminará todas las entradas de \`HookState\` del namespace asociado.

### Flags de SetHook

| Flag | Valor | Descripción |
|---|---|---|
| \`hsfOverride\` | 1 | Permite reemplazar o eliminar un Hook existente en esa posición |
| \`hsfNSDelete\` | 2 | Elimina todo el estado del namespace al desinstalar |
| \`hsfCollect\` | 4 | Permite ejecución como weakTSH |

### HookOn: Filtro de transacciones

El campo \`HookOn\` controla en qué tipos de transacción se activa el Hook:
- Puedes configurar bits específicos para activar o desactivar tipos usando esta [calculadora](https://richardah.github.io/xrpl-hookon-calculator/)
- Si marcamos solo que se active en transacciones de pago, el Hook solo se ejecutará cuando la cuenta reciba o envíe un pago. El resultado en la calculadora es \`0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffbffffe\`. Debemos eliminar la parte de \`0x\`y pasar el resultado a mayúsculas para usarlo en el campo HookOn. Por ejemplo: \`FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFBFFFFE\`.
- Se pueden marcar varias transacciones a la vez. Se recomienda precaución al configurar HookOn para no activar el Hook en tipos de transacción que no necesitas, ya que esto puede generar fees innecesarios y aumentar el riesgo de acciones que no esperemos.

### HookCanEmit: Control de emisión de transacciones

El campo \`HookCanEmit\` es un mecanismo de seguridad fundamental que limita qué transacciones puede emitir un Hook. Por defecto, un Hook tiene la capacidad de emitir transacciones autónomas (usando la función \`emit()\`), lo que podría representar un riesgo si el Hook tiene un bug o ha sido instalado sin revisar su código.

\`HookCanEmit\` es un array que define explícitamente qué tipos de transacción puede emitir el Hook. Si se configura, el Hook **solo podrá emitir las transacciones listadas**, cualquier intento de emitir un tipo no incluido será rechazado por la red. Funciona igual que \`HookOn\`, pero en lugar de controlar la activación del Hook, controla su capacidad de emisión.

- Puedes configurar bits específicos para activar o desactivar tipos usando esta [calculadora](https://richardah.github.io/xrpl-hookon-calculator/)
- Si marcamos solo que se permita emisión de transacciones de pago, el resultado en la calculadora es \`0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffbffffe\`. Debemos eliminar la parte de \`0x\`y pasar el resultado a mayúsculas para usarlo en el campo \`HookCanEmit\`. Por ejemplo: \`FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFBFFFFE\`.
- Aunque \`HookCanEmit\` es un campo opcional, se recomienda utilizarlo para no permitir que un Hook emita transacciones no deseadas, ya que esto puede generar acciones no desesadas de un Hook malicioso.

**¿Por qué es importante para la seguridad?**

- **Principio de mínimo privilegio**: Un Hook debería tener solo los permisos que necesita. Si tu Hook solo necesita enviar pagos, no debería poder emitir \`SetHook\`, \`AccountDelete\` u otras transacciones sensibles.
- **Protección ante bugs**: Si un Hook tiene una vulnerabilidad, \`HookCanEmit\` limita el daño potencial al restringir las acciones que puede ejecutar.
- **Auditoría y transparencia**: Al revisar un Hook instalado en una cuenta, \`HookCanEmit\` permite verificar rápidamente qué operaciones puede realizar de forma autónoma.
- **Buena práctica**: Siempre configura \`HookCanEmit\` con el conjunto mínimo de transacciones necesarias para la lógica de tu Hook.

### Más información

Para una referencia completa de \`SetHook\`, incluyendo todos los campos, flags, reglas de validación y casos especiales, consulta la [documentación oficial](https://xahau.network/docs/protocol-reference/transactions/transaction-types/sethook/).`,
        en: `Once you have your Hook written in C, you need to **compile it to WebAssembly** and **deploy it** to your Xahau account via a \`SetHook\` transaction.

### Development options

**1. Hooks Builder (Online)**
The fastest way to get started. [builder.xahau.network](https://builder.xahau.network) lets you write, compile and deploy Hooks from the browser. It includes examples, documentation and an integrated development environment. Ideal for quick tests and learning. Only available for **Xahau Testnet**.

**2. Local development**
For local development (and later Xahau Mainnet) you need [hooks-toolkit](https://hooks-toolkit.com/), which includes a complete library to compile your hooks and deploy them with custom scripts.

### Deploying a Hook

Once you have a hook ready to deploy, the general process is to generate a \`SetHook\` transaction with the appropriate fields, sign it and send it to the network. The main field for the Hook code is \`CreateCode\`, where you must include the WASM binary in hexadecimal format if this is the first time this Hook will exist on the network.

Testing environments like [Hooks Builder](https://builder.xahau.network) allow you to compile the code and upload it using a graphical interface. Other graphical environments exist for both Xahau Testnet and Mainnet, which require you to use your seed to sign the deployment transaction, such as [xahau-testnet.xrplwin.com/tools](https://xahau-testnet.xrplwin.com/tools). These are only recommended for test environments. As a common practice, it is recommended to learn how to use the \`SetHook\` transaction with custom scripts using the \`xahau js\` library, to later automate deployments, updates and Hook management in production.

### SetHook transaction

The \`SetHook\` transaction is the only transaction needed to manage Hooks. With it you can **install**, **update** and **delete** Hooks from your account. The main fields of the Hook object within the \`Hooks\` array are:

| Field | Description |
|---|---|
| \`CreateCode\` | The Hook WASM binary (in hexadecimal) |
| \`HookHash\` | Hash of an already existing Hook in the ledger (alternative to CreateCode) |
| \`HookOn\` | String defining which transaction types activate the Hook |
| \`HookNamespace\` | Name for the Hook state (32 bytes hex) |
| \`HookApiVersion\` | Hooks API version (currently 0) |
| \`HookParameters\` | Optional configuration parameters |
| \`HookCanEmit\` | List of transactions the Hook can emit (security) |
| \`Flags\` | Control flags (\`hsfOverride\`, \`hsfNSDelete\`, \`hsfCollect\`) |

### Hook management phases

### 1. Install a Hook for the first time (with CreateCode)

When you deploy a new Hook that has never existed on the network, you use the \`CreateCode\` field with the full WASM binary. The node calculates the WASM hash and stores the code in the ledger. If another user already deployed the exact same code, Xahau reuses the existing definition (automatic deduplication).

\`\`\`
Hook: {
  CreateCode: "0061736D...",     // WASM in hex
  HookOn: "0000000000000000",    // All tx types
  HookNamespace: "00...00",      // 64 chars hex
  HookApiVersion: 0,
  Flags: 1,                      // hsfOverride
}
\`\`\`

### 2. Install an existing Hook by HookHash

If a Hook was already deployed before (by you or another account), you can install it on your account **without sending the entire WASM again**. You only need the \`HookHash\` (the SHA-256 hash of the binary). This saves space and fees.

\`\`\`
Hook: {
  HookHash: "A5B6C7D8...",      // Hash of existing Hook
  HookOn: "0000000000000000",
  HookNamespace: "00...00",
  Flags: 1,                      // hsfOverride
}
\`\`\`

You can get the \`HookHash\` by querying an account's Hooks with \`account_objects\` or from a block explorer like [xahau-testnet.xrplwin.com](https://xahau-testnet.xrplwin.com).

### 3. Update a Hook (Update Operation)

The update operation is triggered when the Hook already exists at the position, **no** \`HookHash\` or \`CreateCode\` is sent, and at least one of these fields is included: \`HookNamespace\`, \`HookParameters\` or \`HookGrants\`. This allows modifying the Hook configuration **without replacing the WASM code**.

**What you can modify**:

- **HookNamespace**: If you send a different \`HookNamespace\` than the current one, the Hook's namespace is updated. If you also include the \`hsfNSDelete\` flag (value 2), **all state entries from the previous namespace are deleted**.
- **HookParameters**: For each entry in \`HookParameters\`:
  - If you send a parameter with a name and **no value**, that parameter is **deleted** from the Hook
  - If you send a parameter with a name **and value**, that parameter is **added or updated**
- **HookGrants**: If you include \`HookGrants\`, the Hook's full grants array is **replaced** by the new array provided

\`\`\`
// Example: update only the parameters of an existing Hook
Hook: {
  HookParameters: [
    {
      HookParameter: {
        HookParameterName: "4D494E",        // "MIN"
        HookParameterValue: "00E1F505"      // New value
      }
    },
    {
      HookParameter: {
        HookParameterName: "4D4158",        // "MAX" — delete
        // No HookParameterValue = deleted
      }
    }
  ]
}
\`\`\`

**To completely replace a Hook** with different WASM code, send a new \`SetHook\` with \`CreateCode\` (or \`HookHash\`) at the same position and the \`hsfOverride\` flag (value 1). The previous Hook state is **maintained** if the namespace doesn't change.

### 4. Delete a Hook (Delete Operation)

To delete a Hook from a position, these conditions must be met: the Hook must exist at that position, the \`hsfOverride\` flag must be active, **no** \`HookHash\` is sent, and \`CreateCode\` must be present but **empty**:

\`\`\`
Hook: {
  CreateCode: "",       // Empty = delete
  Flags: 1,             // hsfOverride
}
\`\`\`

Upon deletion:
- The **reference counter** of the \`HookDefinition\` is decremented. If it reaches zero (no other account uses that code), the definition is removed from the ledger
- The Hook object at that position is **deleted**, leaving the position empty

If you also want to **clean all state** from that Hook's namespace, add the \`hsfNSDelete\` flag (value 2) combined with \`hsfOverride\`: \`Flags: 3\`. This will delete all \`HookState\` entries from the associated namespace.

### SetHook Flags

| Flag | Value | Description |
|---|---|---|
| \`hsfOverride\` | 1 | Allows replacing or deleting an existing Hook at that position |
| \`hsfNSDelete\` | 2 | Deletes all namespace state upon uninstall |
| \`hsfCollect\` | 4 | Allow execution as weakTSH. |

### HookOn: Transaction filter

The \`HookOn\` field controls which transaction types activate the Hook:
- You can configure specific bits to enable or disable types using this [calculator](https://richardah.github.io/xrpl-hookon-calculator/)
- If we mark only activation on payment transactions, the Hook will only execute when the account receives or sends a payment. The result in the calculator is \`0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffbffffe\`. We must remove the \`0x\` part and convert the result to uppercase to use it in the HookOn field. For example: \`FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFBFFFFE\`.
- Multiple transactions can be marked at once. Caution is recommended when configuring HookOn to avoid activating the Hook on transaction types you don't need, as this can generate unnecessary fees and increase the risk of unexpected actions.

### HookCanEmit: Transaction emission control

The \`HookCanEmit\` field is a fundamental security mechanism that limits which transactions a Hook can emit. By default, a Hook has the ability to emit autonomous transactions (using the \`emit()\` function), which could represent a risk if the Hook has a bug or was installed without reviewing its code.

\`HookCanEmit\` is an array that explicitly defines which transaction types the Hook can emit. If configured, the Hook **can only emit the listed transactions**, and any attempt to emit a type not included will be rejected by the network. It works just like \`HookOn\`, but instead of controlling Hook activation, it controls its emission capability.

- You can configure specific bits to enable or disable types using this [calculator](https://richardah.github.io/xrpl-hookon-calculator/)
- If we mark only emission of payment transactions, the calculator result is \`0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffbffffe\`. We must remove the \`0x\` part and convert to uppercase to use it in the \`HookCanEmit\` field. For example: \`FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFBFFFFE\`.
- Although \`HookCanEmit\` is an optional field, it is recommended to use it to prevent a Hook from emitting unwanted transactions, as this can generate unwanted actions from a malicious Hook.

**Why is it important for security?**

- **Principle of least privilege**: A Hook should only have the permissions it needs. If your Hook only needs to send payments, it shouldn't be able to emit \`SetHook\`, \`AccountDelete\` or other sensitive transactions.
- **Protection against bugs**: If a Hook has a vulnerability, \`HookCanEmit\` limits the potential damage by restricting the actions it can execute.
- **Audit and transparency**: When reviewing a Hook installed on an account, \`HookCanEmit\` allows quickly verifying what operations it can perform autonomously.
- **Best practice**: Always configure \`HookCanEmit\` with the minimum set of transactions necessary for your Hook's logic.

### More information

For a complete reference on \`SetHook\`, including all fields, flags, validation rules and special cases, see the [official documentation](https://xahau.network/docs/protocol-reference/transactions/transaction-types/sethook/).`,
        jp: `CでHookを記述したら、**WebAssemblyにコンパイル**し、\`SetHook\`トランザクションを使ってXahauアカウントに**デプロイ**する必要があります。

### 開発オプション

**1. Hooks Builder（オンライン）**
最も早く始められる方法。[builder.xahau.network](https://builder.xahau.network) ではブラウザからHooksを記述、コンパイル、デプロイできます。例、ドキュメント、統合開発環境が含まれています。クイックテストと学習に最適。**Xahau Testnet**専用。

**2. ローカル開発**
ローカル開発（Xahau Mainnetへのデプロイを含む）には[hooks-toolkit](https://hooks-toolkit.com/)が必要です。Hooksのコンパイルとカスタムスクリプトでのデプロイに必要な完全なライブラリが含まれています。

### Hookのデプロイ

デプロイ可能なHookが準備できたら、一般的なプロセスは適切なフィールドを持つ\`SetHook\`トランザクションを生成し、署名してネットワークに送信することです。Hookコードの主なフィールドは\`CreateCode\`で、このHookがネットワークに初めて存在する場合はWASMバイナリを16進数形式で含める必要があります。

[Hooks Builder](https://builder.xahau.network)のようなテスト環境では、グラフィカルインターフェースを使ってコードをコンパイルしてアップロードできます。Xahau TestnetとMainnet両方向けのグラフィカル環境が存在し、デプロイトランザクションに署名するためにシードの使用が必要です（[xahau-testnet.xrplwin.com/tools](https://xahau-testnet.xrplwin.com/tools)など）。これらはテスト環境のみで推奨されます。一般的な実践として、\`xahau js\`ライブラリを使用したカスタムスクリプトで\`SetHook\`トランザクションの使い方を習得し、後でデプロイ、アップデート、本番環境でのHook管理を自動化できるようにすることを推奨します。

### SetHookトランザクション

\`SetHook\`トランザクションはHookを管理するために必要な唯一のトランザクションです。これを使ってアカウントのHooksを**インストール**、**更新**、**削除**できます。\`Hooks\`配列内のHookオブジェクトの主なフィールドは次のとおりです。

| フィールド | 説明 |
|---|---|
| \`CreateCode\` | HookのWASMバイナリ（16進数） |
| \`HookHash\` | レジャーに既存のHookのハッシュ（CreateCodeの代替） |
| \`HookOn\` | Hookを起動するトランザクションタイプを定義する文字列 |
| \`HookNamespace\` | Hookステートの名前（32バイトhex） |
| \`HookApiVersion\` | Hooks APIバージョン（現在は0） |
| \`HookParameters\` | オプションの設定パラメーター |
| \`HookCanEmit\` | Hookが発行できるトランザクションのリスト（セキュリティ） |
| \`Flags\` | 制御フラグ（\`hsfOverride\`、\`hsfNSDelete\`、\`hsfCollect\`） |

### Hooksの管理フェーズ

### 1. Hookを初めてインストールする（CreateCodeを使用）

ネットワークに存在したことのない新しいHookをデプロイする場合、完全なWASMバイナリとともに\`CreateCode\`フィールドを使用します。ノードはWASMハッシュを計算してコードをレジャーに保存します。別のユーザーが全く同じコードをすでにデプロイしていた場合、Xahauは既存の定義を再利用します（自動重複排除）。

\`\`\`
Hook: {
  CreateCode: "0061736D...",     // WASMをhex形式で
  HookOn: "0000000000000000",    // すべてのtxタイプ
  HookNamespace: "00...00",      // 64文字hex
  HookApiVersion: 0,
  Flags: 1,                      // hsfOverride
}
\`\`\`

### 2. HookHashで既存のHookをインストールする

Hookが以前にデプロイされていた場合（あなたまたは別のアカウントによって）、**WASM全体を再送信せずに**アカウントにインストールできます。\`HookHash\`（バイナリのSHA-256ハッシュ）だけが必要です。これによりスペースと手数料を節約できます。

\`\`\`
Hook: {
  HookHash: "A5B6C7D8...",      // 既存Hookのハッシュ
  HookOn: "0000000000000000",
  HookNamespace: "00...00",
  Flags: 1,                      // hsfOverride
}
\`\`\`

\`HookHash\`は\`account_objects\`でアカウントのHooksを照会するか、[xahau-testnet.xrplwin.com](https://xahau-testnet.xrplwin.com)のようなブロックエクスプローラーから取得できます。

### 3. Hookを更新する（Update操作）

更新操作は、Hookがその位置に既に存在し、\`HookHash\`も\`CreateCode\`も送信せず、\`HookNamespace\`、\`HookParameters\`、\`HookGrants\`のいずれかを含める場合にトリガーされます。これにより**WASMコードを置き換えずに**Hookの設定を変更できます。

**変更できる内容**：

- **HookNamespace**：現在とは異なる\`HookNamespace\`を送信すると、HookのNamespaceが更新されます。\`hsfNSDelete\`フラグ（値2）も含める場合、**前のNamespaceのすべてのステートエントリが削除されます**。
- **HookParameters**：\`HookParameters\`の各エントリについて：
  - 名前だけで**値なし**のパラメーターを送信すると、そのパラメーターはHookから**削除される**
  - 名前**と値**があるパラメーターを送信すると、そのパラメーターは**追加または更新される**
- **HookGrants**：\`HookGrants\`を含める場合、HookのGrantsの完全な配列が提供された新しい配列に**置き換えられる**

\`\`\`
// 例：既存のHookのパラメーターのみを更新する
Hook: {
  HookParameters: [
    {
      HookParameter: {
        HookParameterName: "4D494E",        // "MIN"
        HookParameterValue: "00E1F505"      // 新しい値
      }
    },
    {
      HookParameter: {
        HookParameterName: "4D4158",        // "MAX" — 削除
        // HookParameterValueなし = 削除される
      }
    }
  ]
}
\`\`\`

**Hookを完全に置き換える**には、同じ位置に新しい\`SetHook\`を\`CreateCode\`（または\`HookHash\`）と\`hsfOverride\`フラグ（値1）とともに送信します。Namespaceが変わらない場合、前のHookステートは**維持されます**。

### 4. Hookを削除する（Delete操作）

配列の特定の位置のHookを削除するには、次の条件を満たす必要があります。その位置にHookが存在すること、\`hsfOverride\`フラグが有効であること、\`HookHash\`を設定しないこと、\`CreateCode\`が存在するが**空**であること。

\`\`\`
Hook: {
  CreateCode: "",       // 空 = 削除
  Flags: 1,             // hsfOverride
}
\`\`\`

削除時：
- \`HookDefinition\`の**参照カウンター**が減少します。ゼロに達すると（そのコードを使用している他のアカウントがない）、\`HookDefinition\`はレジャーから削除されます
- その位置のHookオブジェクトが**削除**され、その位置が空になります

そのHookのNamespaceからすべてのステートを**クリア**したい場合は、\`hsfNSDelete\`フラグ（値2）と\`hsfOverride\`を組み合わせて追加します：\`Flags: 3\`。これにより関連するNamespaceのすべての\`HookState\`エントリが削除されます。

### SetHookフラグ

| フラグ | 値 | 説明 |
|---|---|---|
| \`hsfOverride\` | 1 | その位置の既存のHookを置き換えまたは削除することを許可する |
| \`hsfNSDelete\` | 2 | アンインストール時にNamespaceのすべてのステートを削除する |
| \`hsfCollect\` | 4 | weakTSHとしての実行を許可する |

### HookOn：トランザクションフィルター

\`HookOn\`フィールドは、Hookがどのトランザクションタイプで起動するかを制御します。
- この[HookOn計算機](https://richardah.github.io/xrpl-hookon-calculator/)を使って特定のビットを設定してHookを実行するトランザクションタイプを有効または無効にできます
- Paymentトランザクションのみで起動するように設定すると、アカウントが支払いを受信または送信したときにのみHookが実行されます。この場合、計算機の結果は\`0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffbffffe\`です。\`0x\`の部分を削除し、結果を大文字に変換してHookOnフィールドで使用します。例：\`FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFBFFFFE\`。
- 複数のトランザクションを同時にマークできます。不要なトランザクションタイプでHookが起動しないようにHookOnの設定には注意が必要です。これにより不要な手数料が発生し、予期しないアクションのリスクが増加する可能性があります。

### HookCanEmit：トランザクション発行の制御

\`HookCanEmit\`フィールドは、Hookが発行できるトランザクションを制限する基本的なセキュリティメカニズムです。デフォルトでは、Hookは自律的なトランザクションを発行する能力があります（\`emit()\`関数を使用）が、Hookにバグがあったりコードをレビューせずにインストールされた場合にリスクとなる可能性があります。

\`HookCanEmit\`は、Hookが発行できるトランザクションタイプを明示的に定義する配列です。設定されている場合、Hookは**リストされたトランザクションのみを発行でき**、含まれていないタイプを発行しようとするとネットワークによって拒否されます。\`HookOn\`と同様に機能しますが、Hookの起動を制御する代わりに発行能力を制御します。

- HookOnと同じ[計算機](https://richardah.github.io/xrpl-hookon-calculator/)を使って特定のビットを設定してemitを許可するトランザクションタイプを有効または無効にできます
- Paymentトランザクションの発行のみを許可するようにマークすると、計算機の結果は\`0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffbffffe\`です。\`0x\`の部分を削除し、結果を大文字に変換して\`HookCanEmit\`フィールドで使用します。例：\`FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFBFFFFE\`。
- \`HookCanEmit\`は任意フィールドですが、悪意のあるHookからの望ましくないアクションを防ぐために使用することが推奨されます。

**なぜセキュリティに重要か？**

- **最小権限の原則**：Hookは必要な権限のみを持つべきです。Hookが支払いの送信のみが必要な場合、\`SetHook\`、\`AccountDelete\`やその他の**重要度が高い**トランザクションを発行できるべきではありません。
- **バグに対する保護**：Hookに脆弱性がある場合、\`HookCanEmit\`は実行できるアクションを制限することで潜在的な被害を制限します。
- **監査と透明性**：アカウントにインストールされたHookをレビューする際、\`HookCanEmit\`により自律的に実行できる操作を迅速に確認できます。
- **ベストプラクティス**：Hookのロジックに必要な最小限のトランザクションセットで\`HookCanEmit\`を常に設定します。

### 詳細情報

すべてのフィールド、フラグ、バリデーションルール、特殊ケースを含む\`SetHook\`の完全なリファレンスについては、[公式ドキュメント](https://xahau.network/docs/protocol-reference/transactions/transaction-types/sethook/)をご覧ください。`,
        ko: `Hook을 작성한 뒤에는 **WebAssembly로 컴파일**하고 \`SetHook\` 트랜잭션으로 계정에 **배포**해야 합니다.

### 일반적인 흐름

1. Hook 코드를 작성
2. WASM으로 컴파일
3. \`HookOn\`, \`HookNamespace\`, \`HookParameters\` 등 설정
4. \`SetHook\` 제출
5. 계정 객체나 익스플로러에서 설치 확인

### 중요한 필드

- \`CreateCode\`: 처음 배포할 때 WASM 바이너리
- \`HookHash\`: 이미 존재하는 Hook 재사용
- \`HookOn\`: 어떤 트랜잭션이 Hook을 실행할지
- \`HookCanEmit\`: 어떤 트랜잭션을 발행할 수 있는지
- \`HookNamespace\`: 상태를 분리하는 네임스페이스
- \`Flags\`: 덮어쓰기, 삭제 등 제어 옵션

### 관리 작업

- 새 Hook 설치
- 기존 HookHash로 설치
- 파라미터나 namespace 업데이트
- 빈 \`CreateCode\` 로 삭제

설정을 잘못하면 Hook이 전혀 실행되지 않거나 원하지 않는 트랜잭션에서 작동할 수 있으므로, 배포 전 필드 확인이 매우 중요합니다.`,
        zh: `写好 Hook 之后，需要先将其**编译为 WebAssembly**，再通过 \`SetHook\` 交易**部署**到账户上。

### 一般流程

1. 编写 Hook 代码
2. 编译为 WASM
3. 配置 \`HookOn\`、\`HookNamespace\`、\`HookParameters\` 等字段
4. 提交 \`SetHook\`
5. 通过账户对象或区块浏览器确认是否安装成功

### 重要字段

- \`CreateCode\`：首次部署时使用的 WASM 二进制
- \`HookHash\`：复用已经存在的 Hook
- \`HookOn\`：决定哪些交易会触发 Hook
- \`HookCanEmit\`：决定它可以发出哪些交易
- \`HookNamespace\`：用于隔离状态的命名空间
- \`Flags\`：覆盖、删除等控制选项

### 管理操作

- 安装新的 Hook
- 通过已有 HookHash 安装
- 更新参数或 namespace
- 用空的 \`CreateCode\` 删除 Hook

如果字段配置错误，Hook 可能完全不会执行，或者会在你不希望的交易上触发，因此部署前务必仔细检查。`,
      },
      codeBlocks: [

        {
          title: {
            es: "Desplegar un Hook desde fichero .wasm con xahau.js",
            en: "Deploy a Hook from a .wasm file with xahau.js",
            jp: "xahau.jsで.wasmファイルからHookをデプロイする",
            ko: "xahau.js로 .wasm 파일에서 Hook 배포하기",
            zh: "使用 xahau.js 从 .wasm 文件部署 Hook",
          },
          language: "javascript",
          code: {
            es: `require("dotenv").config();
const { Client, Wallet } = require("xahau");
const fs = require("fs");

async function deployHook() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // Tu cuenta de testnet
  const account = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  // Leer el WASM compilado del Hook
  const wasmBytes = fs.readFileSync("base.wasm"); // Utiliza el nombre del fichero .wasm que quieres desplegar, https://bqsoczh.dlvr.cloud/base.wasm
  const hookBinary = wasmBytes.toString("hex").toUpperCase();

  // Construir la transacción SetHook
  const setHook = {
    TransactionType: "SetHook",
    Account: account.address,
    Hooks: [
      {
        Hook: {
          CreateCode: hookBinary,
          HookOn: "0".repeat(64), // Todos los tipos de tx
          HookCanEmit: "0".repeat(64), // Todos los tipos de tx
          HookNamespace: "0".repeat(64), // Namespace por defecto
          HookApiVersion: 0,
          Flags: 1, // Flag hsfOVERRIDE para que el nuevo hook reemplace cualquier hook anterior en la cuenta
        },
      },
    ],
  };

  const prepared = await client.autofill(setHook);
  const signed = account.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("Resultado:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("¡Hook desplegado con éxito en la cuenta!", account.address);
  }

  await client.disconnect();
}

deployHook();`,
            en: `require("dotenv").config();
const { Client, Wallet } = require("xahau");
const fs = require("fs");

async function deployHook() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // Tu cuenta de testnet
  const account = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  // Read the compiled WASM file for the Hook
  const wasmBytes = fs.readFileSync("base.wasm"); // Use the name of the .wasm file you want to deploy, e.g., https://bqsoczh.dlvr.cloud/base.wasm
  const hookBinary = wasmBytes.toString("hex").toUpperCase();

  // Build the SetHook transaction
  const setHook = {
    TransactionType: "SetHook",
    Account: account.address,
    Hooks: [
      {
        Hook: {
          CreateCode: hookBinary,
          HookOn: "0".repeat(64), // All the types of transactions
          HookCanEmit: "0".repeat(64), // All the types of tx
          HookNamespace: "0".repeat(64), // Namespace by default
          HookApiVersion: 0,
          Flags: 1, // Flag hsfOVERRIDE so the new hook replaces any previous hook on the account
        },
      },
    ],
  };

  const prepared = await client.autofill(setHook);
  const signed = account.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("Result:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("Hook deployed successfully on account:", account.address);
  }

  await client.disconnect();
}

deployHook();`,
            jp: `require("dotenv").config();
const { Client, Wallet } = require("xahau");
const fs = require("fs");

async function deployHook() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // テストネットのアカウント
  const account = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  // HookのコンパイルされたWASMファイルを読み込む
  const wasmBytes = fs.readFileSync("base.wasm"); // デプロイしたい.wasmファイル名を使用、例：https://bqsoczh.dlvr.cloud/base.wasm
  const hookBinary = wasmBytes.toString("hex").toUpperCase();

  // SetHookトランザクションを構築する
  const setHook = {
    TransactionType: "SetHook",
    Account: account.address,
    Hooks: [
      {
        Hook: {
          CreateCode: hookBinary,
          HookOn: "0".repeat(64), // すべてのtxタイプ
          HookCanEmit: "0".repeat(64), // すべてのtxタイプ
          HookNamespace: "0".repeat(64), // デフォルト名前空間
          HookApiVersion: 0,
          Flags: 1, // 新しいhookがアカウントの既存のhookを置き換えるhsfOVERRIDEフラグ
        },
      },
    ],
  };

  const prepared = await client.autofill(setHook);
  const signed = account.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("結果:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("アカウントへのHookのデプロイに成功しました！", account.address);
  }

  await client.disconnect();
}

deployHook();`,
            ko: `require("dotenv").config();
const { Client, Wallet } = require("xahau");
const fs = require("fs");

async function deployHook() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // 테스트넷 계정
  const account = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  // 컴파일된 Hook WASM 파일 읽기
  const wasmBytes = fs.readFileSync("base.wasm"); // 배포할 .wasm 파일명 사용
  const hookBinary = wasmBytes.toString("hex").toUpperCase();

  // SetHook 트랜잭션 구성
  const setHook = {
    TransactionType: "SetHook",
    Account: account.address,
    Hooks: [
      {
        Hook: {
          CreateCode: hookBinary,
          HookOn: "0".repeat(64), // 모든 tx 타입
          HookCanEmit: "0".repeat(64), // 모든 tx 타입
          HookNamespace: "0".repeat(64), // 기본 namespace
          HookApiVersion: 0,
          Flags: 1, // 기존 Hook을 덮어쓰기
        },
      },
    ],
  };

  const prepared = await client.autofill(setHook);
  const signed = account.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("결과:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("계정에 Hook이 성공적으로 배포되었습니다!", account.address);
  }

  await client.disconnect();
}

deployHook();`,
            zh: `require("dotenv").config();
const { Client, Wallet } = require("xahau");
const fs = require("fs");

async function deployHook() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // Testnet 账户
  const account = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  // 读取编译后的 Hook WASM 文件
  const wasmBytes = fs.readFileSync("base.wasm"); // 使用你要部署的 .wasm 文件名
  const hookBinary = wasmBytes.toString("hex").toUpperCase();

  // 构建 SetHook 交易
  const setHook = {
    TransactionType: "SetHook",
    Account: account.address,
    Hooks: [
      {
        Hook: {
          CreateCode: hookBinary,
          HookOn: "0".repeat(64),
          HookCanEmit: "0".repeat(64),
          HookNamespace: "0".repeat(64),
          HookApiVersion: 0,
          Flags: 1,
        },
      },
    ],
  };

  const prepared = await client.autofill(setHook);
  const signed = account.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("结果:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("Hook 已成功部署到账户上！", account.address);
  }

  await client.disconnect();
}

deployHook();`,
          },
        },{
          title: {
            es: "Borrar un Hook de una cuenta con xahau.js",
            en: "Delete a Hook from an account with xahau.js",
            jp: "xahau.jsでアカウントからHookを削除する",
            ko: "xahau.js로 계정에서 Hook 삭제하기",
            zh: "使用 xahau.js 从账户删除 Hook",
          },
          language: "javascript",
          code: {
            es: `require("dotenv").config();
const { Client, Wallet } = require("xahau");
const fs = require("fs");

async function removeHook() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // Tu cuenta de testnet
  const account = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  // Construir la transacción SetHook
  const setHook = {
    TransactionType: "SetHook",
    Account: account.address,
    Hooks: [
      {
        Hook: {
          CreateCode: "", // Si está vacío, se asume que quieres borrar el hook que está en esta posición del array.
          Flags: 1, // Flag hsfOVERRIDE para que el nuevo hook reemplace cualquier hook anterior en la cuenta
        },
      },
    ],
  };

  const prepared = await client.autofill(setHook);
  const signed = account.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("Resultado:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("¡Hook eliminado con éxito en la cuenta!", account.address);
  }

  await client.disconnect();
}

removeHook();`,
            en: `require("dotenv").config();
const { Client, Wallet } = require("xahau");
const fs = require("fs");

async function removeHook() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // Your account on Testnet
  const account = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  // Build the SetHook transaction
  const setHook = {
    TransactionType: "SetHook",
    Account: account.address,
    Hooks: [
      {
        Hook: {
          CreateCode: "", // If it's empty, it assumes you want to remove the hook in this position of the array.
          Flags: 1, // Flag hsfOVERRIDE so the new hook replaces any previous hook on the account
        },
      },
    ],
  };

  const prepared = await client.autofill(setHook);
  const signed = account.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("Result:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("Hook succesfully removed from the account!", account.address);
  }

  await client.disconnect();
}

removeHook();`,
            jp: `require("dotenv").config();
const { Client, Wallet } = require("xahau");
const fs = require("fs");

async function removeHook() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // テストネットのアカウント
  const account = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  // SetHookトランザクションを構築する
  const setHook = {
    TransactionType: "SetHook",
    Account: account.address,
    Hooks: [
      {
        Hook: {
          CreateCode: "", // 空の場合、配列のこの位置のhookを削除することを意味する
          Flags: 1, // 新しいhookがアカウントの既存のhookを置き換えるhsfOVERRIDEフラグ
        },
      },
    ],
  };

  const prepared = await client.autofill(setHook);
  const signed = account.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("結果:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("アカウントからHookを正常に削除しました！", account.address);
  }

  await client.disconnect();
}

removeHook();`,
            ko: `require("dotenv").config();
const { Client, Wallet } = require("xahau");
const fs = require("fs");

async function removeHook() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // 테스트넷 계정
  const account = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  // SetHook 트랜잭션 구성
  const setHook = {
    TransactionType: "SetHook",
    Account: account.address,
    Hooks: [
      {
        Hook: {
          CreateCode: "", // 비어 있으면 이 위치의 Hook 삭제
          Flags: 1, // 기존 Hook 덮어쓰기 허용
        },
      },
    ],
  };

  const prepared = await client.autofill(setHook);
  const signed = account.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("결과:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("계정에서 Hook이 정상적으로 삭제되었습니다!", account.address);
  }

  await client.disconnect();
}

removeHook();`,
            zh: `require("dotenv").config();
const { Client, Wallet } = require("xahau");
const fs = require("fs");

async function removeHook() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const account = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  const setHook = {
    TransactionType: "SetHook",
    Account: account.address,
    Hooks: [
      {
        Hook: {
          CreateCode: "",
          Flags: 1,
        },
      },
    ],
  };

  const prepared = await client.autofill(setHook);
  const signed = account.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("结果:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("Hook 已成功从账户中删除！", account.address);
  }

  await client.disconnect();
}

removeHook();`,
          },
        },
        {
          title: {
            es: "Instalar un Hook con el HookHash con xahau.js",
            en: "Install a Hook by HookHash with xahau.js",
            jp: "xahau.jsでHookHashによりHookをインストールする",
            ko: "xahau.js로 HookHash를 이용해 Hook 설치하기",
            zh: "使用 xahau.js 通过 HookHash 安装 Hook",
          },
          language: "javascript",
          code: {
            es: `require("dotenv").config();
const { Client, Wallet } = require("xahau");
const fs = require("fs");

async function deployHook() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // Tu cuenta de testnet
  const account = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  // Construir la transacción SetHook
  const setHook = {
    TransactionType: "SetHook",
    Account: account.address,
    Hooks: [
      {
        Hook: {
          HookHash: "66A4FC969ADB5998FD371B7B011F1BC3E506D2171F4729B52E57A6A8BC093227", // El hash del hook que queremos instalar. Es necesario que se haya instalado previamente y esté disponible en la red en la que trabajamos.
          HookOn: "0".repeat(64), // Todos los tipos de tx
          HookCanEmit: "0".repeat(64), // Todos los tipos de tx
          HookNamespace: "0".repeat(64), // Namespace por defecto
          Flags: 1, // Flag hsfOVERRIDE para que el nuevo hook reemplace cualquier hook anterior en la cuenta
        },
      },
    ],
  };

  const prepared = await client.autofill(setHook);
  const signed = account.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("Resultado:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("¡Hook desplegado con éxito en la cuenta!", account.address);
  }

  await client.disconnect();
}

deployHook();`,
            en: `require("dotenv").config();
const { Client, Wallet } = require("xahau");
const fs = require("fs");

async function deployHook() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // Your Testnet account
  const account = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  // Build your SetHook transaction
  const setHook = {
    TransactionType: "SetHook",
    Account: account.address,
    Hooks: [
      {
        Hook: {
          HookHash: "66A4FC969ADB5998FD371B7B011F1BC3E506D2171F4729B52E57A6A8BC093227", // The hook's hash. It must be installed previously and available in the network we are working on.
          HookOn: "0".repeat(64), // All transaction types
          HookCanEmit: "0".repeat(64), // All transaction types
          HookNamespace: "0".repeat(64), // Default namespace
          Flags: 1, // Flag hsfOVERRIDE to replace any previous hook in the account
        },
      },
    ],
  };

  const prepared = await client.autofill(setHook);
  const signed = account.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("Result:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("Hook installed successfully on account:", account.address);
  }

  await client.disconnect();
}

deployHook();`,
            jp: `require("dotenv").config();
const { Client, Wallet } = require("xahau");
const fs = require("fs");

async function deployHook() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // テストネットのアカウント
  const account = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  // SetHookトランザクションを構築する
  const setHook = {
    TransactionType: "SetHook",
    Account: account.address,
    Hooks: [
      {
        Hook: {
          HookHash: "66A4FC969ADB5998FD371B7B011F1BC3E506D2171F4729B52E57A6A8BC093227", // インストールしたいhookのハッシュ。ネットワークに既にデプロイされている必要がある
          HookOn: "0".repeat(64), // すべてのtxタイプ
          HookCanEmit: "0".repeat(64), // すべてのtxタイプ
          HookNamespace: "0".repeat(64), // デフォルト名前空間
          Flags: 1, // 新しいhookがアカウントの既存のhookを置き換えるhsfOVERRIDEフラグ
        },
      },
    ],
  };

  const prepared = await client.autofill(setHook);
  const signed = account.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("結果:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("アカウントへのHookのインストールに成功しました！", account.address);
  }

  await client.disconnect();
}

deployHook();`,
            ko: `require("dotenv").config();
const { Client, Wallet } = require("xahau");
const fs = require("fs");

async function deployHook() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  // 테스트넷 계정
  const account = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  // SetHook 트랜잭션 구성
  const setHook = {
    TransactionType: "SetHook",
    Account: account.address,
    Hooks: [
      {
        Hook: {
          HookHash: "66A4FC969ADB5998FD371B7B011F1BC3E506D2171F4729B52E57A6A8BC093227", // 네트워크에 이미 존재하는 Hook 해시
          HookOn: "0".repeat(64), // 모든 tx 타입
          HookCanEmit: "0".repeat(64), // 모든 tx 타입
          HookNamespace: "0".repeat(64), // 기본 namespace
          Flags: 1, // 기존 Hook 덮어쓰기 허용
        },
      },
    ],
  };

  const prepared = await client.autofill(setHook);
  const signed = account.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("결과:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("계정에 Hook이 성공적으로 설치되었습니다!", account.address);
  }

  await client.disconnect();
}

deployHook();`,
            zh: `require("dotenv").config();
const { Client, Wallet } = require("xahau");
const fs = require("fs");

async function deployHook() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const account = Wallet.fromSeed(process.env.WALLET_SEED, {algorithm: 'secp256k1'});

  const setHook = {
    TransactionType: "SetHook",
    Account: account.address,
    Hooks: [
      {
        Hook: {
          HookHash: "66A4FC969ADB5998FD371B7B011F1BC3E506D2171F4729B52E57A6A8BC093227",
          HookOn: "0".repeat(64),
          HookCanEmit: "0".repeat(64),
          HookNamespace: "0".repeat(64),
          Flags: 1,
        },
      },
    ],
  };

  const prepared = await client.autofill(setHook);
  const signed = account.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log("结果:", result.result.meta.TransactionResult);

  if (result.result.meta.TransactionResult === "tesSUCCESS") {
    console.log("Hook 已成功安装到账户上！", account.address);
  }

  await client.disconnect();
}

deployHook();`,
          },
        },
        {
          title: {
            es: "Verificar los Hooks instalados en una cuenta",
            en: "Check installed Hooks on an account",
            jp: "アカウントにインストールされたHooksを確認する",
            ko: "계정에 설치된 Hook 확인하기",
            zh: "检查账户上已安装的 Hook",
          },
          language: "javascript",
          code: {
            es: `const { Client } = require("xahau");

async function checkHooks(address) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const response = await client.request({
    command: "account_objects",
    account: address,
    type: "hook",
    ledger_index: "validated",
  });

  const hooks = response.result.account_objects;
  console.log(\`=== Hooks de \${address} ===\`);
  console.log(\`Total instalados: \${hooks.length}\n\`);

  for (let i = 0; i < hooks.length; i++) {
    const hook = hooks[i];

    console.log(\`Hook #\${i + 1}:\`);
    //console.log(JSON.stringify(hook, null, 2)); //Si quieres ver toda la info del hook, descomenta esta línea

    if (hook.Hooks && hook.Hooks.length > 0) {
      const installedHook = hook.Hooks[0].Hook;

      console.log(\`  HookHash: \${installedHook.HookHash}\`);
      console.log(\`  HookOn: \${installedHook.HookOn}\`);
      console.log(\`  Namespace: \${installedHook.HookNamespace}\`);
      console.log(\`  HookCanEmit: \${installedHook.HookCanEmit}\`);
    }

    console.log();
  }

  await client.disconnect();
}
// Una dirección de ejemplo con un Hook en Testnet: rHdPUUeSDTcjacxR572aEe7zR9re4mvXJN
checkHooks("rTuDireccionAqui");`,
            en: `const { Client } = require("xahau");

async function checkHooks(address) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const response = await client.request({
    command: "account_objects",
    account: address,
    type: "hook",
    ledger_index: "validated",
  });

  const hooks = response.result.account_objects;
  console.log(\`=== Hooks of \${address} ===\`);
  console.log(\`Total installed: \${hooks.length}\n\`);

  for (let i = 0; i < hooks.length; i++) {
    const hook = hooks[i];

    console.log(\`Hook #\${i + 1}:\`);
    //console.log(JSON.stringify(hook, null, 2)); //If you want to see all hook info, uncomment this line

    if (hook.Hooks && hook.Hooks.length > 0) {
      const installedHook = hook.Hooks[0].Hook;

      console.log(\`  HookHash: \${installedHook.HookHash}\`);
      console.log(\`  HookOn: \${installedHook.HookOn}\`);
      console.log(\`  Namespace: \${installedHook.HookNamespace}\`);
      console.log(\`  HookCanEmit: \${installedHook.HookCanEmit}\`);
    }

    console.log();
  }

  await client.disconnect();
}
// Example addres with a Hook in Testnet: rHdPUUeSDTcjacxR572aEe7zR9re4mvXJN
checkHooks("rTuDireccionAqui");`,
            jp: `const { Client } = require("xahau");

async function checkHooks(address) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const response = await client.request({
    command: "account_objects",
    account: address,
    type: "hook",
    ledger_index: "validated",
  });

  const hooks = response.result.account_objects;
  console.log(\`=== \${address} のHooks ===\`);
  console.log(\`合計インストール数: \${hooks.length}\n\`);

  for (let i = 0; i < hooks.length; i++) {
    const hook = hooks[i];

    console.log(\`Hook #\${i + 1}:\`);
    //console.log(JSON.stringify(hook, null, 2)); // hookの全情報を見たい場合はこの行をコメント解除

    if (hook.Hooks && hook.Hooks.length > 0) {
      const installedHook = hook.Hooks[0].Hook;

      console.log(\`  HookHash: \${installedHook.HookHash}\`);
      console.log(\`  HookOn: \${installedHook.HookOn}\`);
      console.log(\`  Namespace: \${installedHook.HookNamespace}\`);
      console.log(\`  HookCanEmit: \${installedHook.HookCanEmit}\`);
    }

    console.log();
  }

  await client.disconnect();
}
// TestnetでHookを持つアドレスの例: rHdPUUeSDTcjacxR572aEe7zR9re4mvXJN
checkHooks("rTuDireccionAqui");`,
            ko: `const { Client } = require("xahau");

async function checkHooks(address) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const response = await client.request({
    command: "account_objects",
    account: address,
    type: "hook",
    ledger_index: "validated",
  });

  const hooks = response.result.account_objects;
  console.log(\`=== \${address} 의 Hooks ===\`);
  console.log(\`설치된 총 수: \${hooks.length}\n\`);

  for (let i = 0; i < hooks.length; i++) {
    const hook = hooks[i];

    console.log(\`Hook #\${i + 1}:\`);
    //console.log(JSON.stringify(hook, null, 2)); // 전체 정보를 보려면 주석 해제

    if (hook.Hooks && hook.Hooks.length > 0) {
      const installedHook = hook.Hooks[0].Hook;

      console.log(\`  HookHash: \${installedHook.HookHash}\`);
      console.log(\`  HookOn: \${installedHook.HookOn}\`);
      console.log(\`  Namespace: \${installedHook.HookNamespace}\`);
      console.log(\`  HookCanEmit: \${installedHook.HookCanEmit}\`);
    }

    console.log();
  }

  await client.disconnect();
}
// Testnet 예시 주소: rHdPUUeSDTcjacxR572aEe7zR9re4mvXJN
checkHooks("rTuDireccionAqui");`,
            zh: `const { Client } = require("xahau");

async function checkHooks(address) {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const response = await client.request({
    command: "account_objects",
    account: address,
    type: "hook",
    ledger_index: "validated",
  });

  const hooks = response.result.account_objects;
  console.log(\`=== \${address} 的 Hooks ===\`);
  console.log(\`已安装总数: \${hooks.length}\n\`);

  for (let i = 0; i < hooks.length; i++) {
    const hook = hooks[i];

    console.log(\`Hook #\${i + 1}:\`);
    //console.log(JSON.stringify(hook, null, 2)); // 如需查看完整信息可取消注释

    if (hook.Hooks && hook.Hooks.length > 0) {
      const installedHook = hook.Hooks[0].Hook;

      console.log(\`  HookHash: \${installedHook.HookHash}\`);
      console.log(\`  HookOn: \${installedHook.HookOn}\`);
      console.log(\`  Namespace: \${installedHook.HookNamespace}\`);
      console.log(\`  HookCanEmit: \${installedHook.HookCanEmit}\`);
    }

    console.log();
  }

  await client.disconnect();
}
// Testnet 示例地址: rHdPUUeSDTcjacxR572aEe7zR9re4mvXJN
checkHooks("rTuDireccionAqui");`,
          },
        },
      ],
      slides: [
        {
          title: { es: "SetHook: campos principales", en: "SetHook: main fields", jp: "SetHook：主要フィールド", ko: "SetHook: 주요 필드", zh: "SetHook：主要字段" },
          content: {
            es: "Transaccion unica para gestionar Hooks\n\n• CreateCode: WASM en hex\n• HookHash: instalar Hook existente por hash\n• HookOn: filtro de transacciones\n• HookNamespace: aislamiento de estado\n• HookParameters: configuracion sin recompilar\n• HookCanEmit: control de emisiones (seguridad)\n• Flags: hsfOverride | hsfNSDelete | hsfCollect",
            en: "Single transaction to manage Hooks\n\n• CreateCode: WASM in hex\n• HookHash: install existing Hook by hash\n• HookOn: transaction filter\n• HookNamespace: state isolation\n• HookParameters: configuration without recompiling\n• HookCanEmit: emission control (security)\n• Flags: hsfOverride | hsfNSDelete | hsfCollect",
            jp: "Hooksを管理する単一トランザクション\n\n• CreateCode: WASMをhex形式で\n• HookHash: 既存HookをHashでインストール\n• HookOn: トランザクションフィルター\n• HookNamespace: ステートの分離\n• HookParameters: 再コンパイルなしで設定\n• HookCanEmit: 発行制御（セキュリティ）\n• Flags: hsfOverride | hsfNSDelete | hsfCollect",
            ko: "Hook을 관리하는 단일 트랜잭션\n\n• CreateCode: hex 형식의 WASM\n• HookHash: 기존 Hook 해시로 설치\n• HookOn: 트랜잭션 필터\n• HookNamespace: 상태 분리\n• HookParameters: 재컴파일 없는 설정 변경\n• HookCanEmit: 발행 제어\n• Flags: hsfOverride | hsfNSDelete | hsfCollect",
            zh: "管理 Hook 的单一交易\n\n• CreateCode：十六进制格式的 WASM\n• HookHash：通过已有 Hook 哈希安装\n• HookOn：交易过滤器\n• HookNamespace：状态隔离\n• HookParameters：无需重新编译即可修改配置\n• HookCanEmit：发交易控制\n• Flags：hsfOverride | hsfNSDelete | hsfCollect",
          },
          visual: "⚙️",
        },
        {
          title: { es: "4 fases de gestion de un Hook", en: "4 Hook management phases", jp: "Hookの管理4フェーズ", ko: "Hook 관리의 4단계", zh: "Hook 管理的 4 个阶段" },
          content: {
            es: "1. Instalar (CreateCode) → WASM completo\n2. Instalar por HookHash → sin enviar WASM\n3. Actualizar (Update) → modificar namespace,\n   parametros o grants sin cambiar codigo\n4. Eliminar (Delete) → CreateCode vacio\n   + hsfOverride. hsfNSDelete limpia estado",
            en: "1. Install (CreateCode) → full WASM\n2. Install by HookHash → without sending WASM\n3. Update → modify namespace,\n   parameters or grants without changing code\n4. Delete → empty CreateCode\n   + hsfOverride. hsfNSDelete clears state",
            jp: "1. インストール（CreateCode）→ 完全なWASM\n2. HookHashでインストール → WASMを送信せずに\n3. 更新（Update）→ 名前空間、\n   パラメーターやGrantsをコード変更なしで修正\n4. 削除（Delete）→ 空のCreateCode\n   + hsfOverride。hsfNSDeleteでステートをクリア",
            ko: "1. 설치(CreateCode) → 전체 WASM 사용\n2. HookHash로 설치 → WASM 재전송 없음\n3. 업데이트(Update) → 코드 변경 없이 namespace,\n   파라미터, grants 수정\n4. 삭제(Delete) → 빈 CreateCode\n   + hsfOverride, 필요 시 hsfNSDelete로 상태 정리",
            zh: "1. 安装（CreateCode）→ 使用完整 WASM\n2. 通过 HookHash 安装 → 无需重新发送 WASM\n3. 更新（Update）→ 不改代码，只改 namespace、参数或 grants\n4. 删除（Delete）→ 使用空的 CreateCode\n   + hsfOverride，必要时用 hsfNSDelete 清理状态",
          },
          visual: "🔄",
        },
        {
          title: { es: "HookOn y HookCanEmit", en: "HookOn and HookCanEmit", jp: "HookOnとHookCanEmit", ko: "HookOn과 HookCanEmit", zh: "HookOn 与 HookCanEmit" },
          content: {
            es: "HookOn: que transacciones activan el Hook\nHookCanEmit: que transacciones puede emitir\n\n• Ambos usan la misma calculadora\n• Resultado hex sin 0x, en mayusculas\n• Principio de minimo privilegio\n• HookCanEmit opcional pero recomendado",
            en: "HookOn: which transactions activate the Hook\nHookCanEmit: which transactions it can emit\n\n• Both use the same calculator\n• Hex result without 0x, uppercase\n• Principle of least privilege\n• HookCanEmit optional but recommended",
            jp: "HookOn: どのトランザクションがHookを起動するか\nHookCanEmit: どのトランザクションを発行できるか\n\n• 両方とも同じ計算機を使用\n• 0xなしhex結果、大文字\n• 最小権限の原則\n• HookCanEmitはオプションだが推奨",
            ko: "HookOn: 어떤 트랜잭션이 Hook을 실행하는가\nHookCanEmit: 어떤 트랜잭션을 발행할 수 있는가\n\n• 둘 다 같은 계산기 사용\n• 0x 없는 대문자 hex 사용\n• 최소 권한 원칙 적용\n• HookCanEmit은 선택이지만 권장",
            zh: "HookOn：哪些交易会触发 Hook\nHookCanEmit：它可以发出哪些交易\n\n• 两者都使用同一个计算器\n• 使用不带 0x 的大写十六进制\n• 应遵循最小权限原则\n• HookCanEmit 可选，但强烈推荐",
          },
          visual: "🎯",
        },
      ],
    },
    {
      id: "m8l3",
      title: {
        es: "Estado persistente en Hooks",
        en: "Persistent state in Hooks",
        jp: "Hooksの永続的なステート",
        ko: "Hooks의 영속 상태",
        zh: "Hooks 中的持久状态",
      },
      theory: {
        es: `Los Hooks pueden almacenar **datos persistentes** entre ejecuciones usando el sistema de estado (\`state\`). Esto permite que un Hook tenga información disponible con la que trabajar en uno o varios \`Namespace\`.

### Estructura del estado

El Namespace se identifica con 32 bytes (256 bits) en hexadecimal. El estado se organiza como pares **clave-valor**:

- **Clave**: 32 bytes (256 bits). Si tu clave es más corta, se rellena con ceros
- **Valor**: hasta 256 bytes por entrada
- Cada entrada de estado se identifica por su clave dentro de un **Namespace**

### Limitaciones

- Una cuenta puede almacenar un máximo de 256 namespaces.
- Los registros de clave-valor dependerá de tus reservas de XAH.

### Funciones de estado

Estas son algunas funciones que podemos utilizar para leer o escribir información en \`Namespace\`.

- [state()](https://xahau.network/docs/hooks/functions/state/state/): Lee un valor del estado usando una clave
- [state_set()](https://xahau.network/docs/hooks/functions/state/state_set/): Escribe un valor en el estado para una clave
- [state_foreign()](https://xahau.network/docs/hooks/functions/state/state_foreign/): Lee el estado de un \`Namespace\`que no es el propio.
- [state_foreign_set()](https://xahau.network/docs/hooks/functions/state/state_foreign_set/): Escribe un valor en el estado de un \`Namespace\`que no es el propio.

### Usos prácticos del estado

- **Contadores**: contar transacciones procesadas, pagos recibidos, etc.
- **Listas blancas/negras**: almacenar direcciones permitidas o bloqueadas
- **Configuración**: guardar parámetros que el Hook consulta en cada ejecución
- **Tracking**: registrar la última transacción procesada, timestamps, etc.
- **Acumuladores**: sumar montos, promediar valores, llevar balances internos`,
        en: `Hooks can store **persistent data** between executions using the state system (\`state\`). This allows a Hook to have information available to work with in one or more \`Namespace\`s.

### State structure

The Namespace is identified with 32 bytes (256 bits) in hexadecimal. State is organized as **key-value** pairs:

- **Key**: 32 bytes (256 bits). If your key is shorter, it is padded with zeros
- **Value**: up to 256 bytes per entry
- Each state entry is identified by its key within a **Namespace**

### Limitations

- An account can store a maximum of 256 namespaces.
- Key-value records will depend on your XAH reserves.

### State functions

Here are some functions we can use to read or write information in \`Namespace\`.

- [state()](https://xahau.network/docs/hooks/functions/state/state/): Reads a value from state using a key
- [state_set()](https://xahau.network/docs/hooks/functions/state/state_set/): Writes a value to state for a key
- [state_foreign()](https://xahau.network/docs/hooks/functions/state/state_foreign/): Reads the state of a \`Namespace\` that is not its own.
- [state_foreign_set()](https://xahau.network/docs/hooks/functions/state/state_foreign_set/): Writes a value to the state of a \`Namespace\` that is not its own.

### Practical uses of state

- **Counters**: count processed transactions, received payments, etc.
- **Whitelists/blacklists**: store allowed or blocked addresses
- **Configuration**: save parameters that the Hook queries on each execution
- **Tracking**: record the last processed transaction, timestamps, etc.
- **Accumulators**: sum amounts, average values, keep internal balances`,
        jp: `Hooksは状態システム（\`state\`）を使って実行間で**永続的なデータ**を保存できます。これにより1つ以上の\`Namespace\`で作業するための情報をHookが持てるようになります。

### ステートの構造

Namespaceは16進数の32バイト（256ビット）で識別されます。ステートは**キーと値**のペアとして管理されます。

- **キー**：32バイト（256ビット）。キーが短い場合はゼロで埋められる
- **値**：エントリあたり最大256バイト
- 各ステートエントリは**Namespace**内のキーで識別される

### 制限事項

- アカウントは最大256個のNamespaceを保存できる。
- キーと値のレコード数はXAHの準備金に依存する。

### ステート関数

\`Namespace\`で情報を読み書きするために使用できる関数のいくつかを以下に示します。

- [state()](https://xahau.network/docs/hooks/functions/state/state/)：キーを使ってステートから値を読み取る
- [state_set()](https://xahau.network/docs/hooks/functions/state/state_set/)：キーに対してステートに値を書き込む
- [state_foreign()](https://xahau.network/docs/hooks/functions/state/state_foreign/)：自身のものでない\`Namespace\`のステートを読み取る。
- [state_foreign_set()](https://xahau.network/docs/hooks/functions/state/state_foreign_set/)：自身のものでない\`Namespace\`のステートに値を書き込む。

### ステートの実用的な用途

- **カウンター**：処理されたトランザクション、受信した支払いなどをカウントする
- **ホワイトリスト/ブラックリスト**：許可または拒否されたアドレスを保存する
- **設定**：各実行時にHookが照会するパラメーターを保存する
- **トラッキング**：最後に処理したトランザクション、タイムスタンプなどを記録する
- **アキュムレーター**：金額を合計し、値を平均し、内部残高を管理する`,
        ko: `Hook은 \`state\` 시스템을 사용해 실행 사이에 **영속 데이터**를 저장할 수 있습니다. 이 덕분에 단순 반응형 로직을 넘어 상태 기반 로직을 만들 수 있습니다.

### 상태 구조

- 키: 32바이트
- 값: 항목당 최대 256바이트
- 모든 값은 특정 **namespace** 안에 저장됨

### 자주 쓰는 함수

- \`state()\`: 값 읽기
- \`state_set()\`: 값 저장
- \`state_foreign()\`: 다른 namespace 읽기
- \`state_foreign_set()\`: 다른 namespace 쓰기

### 활용 예시

- 카운터 유지
- 화이트리스트/블랙리스트
- 동적 설정 저장
- 마지막 처리 결과 기록
- 내부 잔액이나 누적값 관리

저장 공간과 준비금 비용이 있으므로 상태 구조는 처음부터 간결하게 설계하는 편이 좋습니다.`,
        zh: `Hook 可以通过 \`state\` 系统在多次执行之间保存**持久数据**。这让你不仅能写简单的响应式逻辑，还能构建真正依赖状态的逻辑。

### 状态结构

- 键：32 字节
- 值：每项最多 256 字节
- 所有值都存储在特定的 **namespace** 中

### 常用函数

- \`state()\`：读取值
- \`state_set()\`：写入值
- \`state_foreign()\`：读取其他 namespace
- \`state_foreign_set()\`：写入其他 namespace

### 典型用途

- 维护计数器
- 白名单 / 黑名单
- 保存动态配置
- 记录最后一次处理结果
- 管理内部余额或累计值

由于存储空间和储备金都有成本，状态结构最好从一开始就设计得尽量精简。`,
      },
      codeBlocks: [
        {
          title: {
            es: "Hook que cuenta pagos procesados",
            en: "Hook that counts processed payments",
            jp: "処理された支払いをカウントするHook",
            ko: "처리한 결제를 세는 Hook",
            zh: "统计已处理付款数量的 Hook",
          },
          language: "c",
          code: {
            es: `#include "hookapi.h"

/**
 * Hook: payment_counter.c
 * Cuenta cuántos pagos ha procesado la cuenta.
 * Almacena el contador en el estado del Hook.
 */

int64_t hook(uint32_t reserved) {
    _g(1, 1);

    // Solo contar pagos (tipo 0)
    int64_t tt = otxn_type();
    if (tt != 0) {
        accept(SBUF("payment_counter: No es un pago."), __LINE__);
    }

    // Clave de estado para el contador (32 bytes, rellena con ceros)
    uint8_t state_key[32] = { 0 };
    state_key[0] = 'C'; // 'C' de Counter

    // Leer el contador actual del estado
    int64_t counter = 0;
    uint8_t counter_buf[8] = { 0 };
    int64_t bytes_read = state(SBUF(counter_buf), SBUF(state_key));

    if (bytes_read == 8) {
        // El contador ya existe, leer su valor
        counter = *((int64_t*)counter_buf);
    }

    // Incrementar el contador
    counter++;

    // Escribir el nuevo valor en el estado
    *((int64_t*)counter_buf) = counter;
    int64_t result = state_set(SBUF(counter_buf), SBUF(state_key));

    if (result < 0) {
        rollback(SBUF("payment_counter: Error al guardar estado."), __LINE__);
    }

    // Aceptar la transacción
    accept(SBUF("payment_counter: Pago contado."), __LINE__);
    return 0;
}`,
            en: `#include "hookapi.h"

/**
 * Hook: payment_counter.c
 * Counts how many payments have been processed by the account.
 * Stores the counter in the Hook's state.
 */

int64_t hook(uint32_t reserved) {
    _g(1, 1);

    // Only count payments (type 0)
    int64_t tt = otxn_type();
    if (tt != 0) {
        accept(SBUF("payment_counter: It's not a payment."), __LINE__);
    }

    // Key for the counter state (32 bytes, filled with zeros)
    uint8_t state_key[32] = { 0 };
    state_key[0] = 'C'; // 'C' of Counter

    // Read the current counter value from state
    int64_t counter = 0;
    uint8_t counter_buf[8] = { 0 };
    int64_t bytes_read = state(SBUF(counter_buf), SBUF(state_key));

    if (bytes_read == 8) {
        // The counter already exists, read its value
        counter = *((int64_t*)counter_buf);
    }

    // Increment the counter
    counter++;

    // Write the new value to state
    *((int64_t*)counter_buf) = counter;
    int64_t result = state_set(SBUF(counter_buf), SBUF(state_key));

    if (result < 0) {
        rollback(SBUF("payment_counter: Error al guardar estado."), __LINE__);
    }

    // Accept the transaction
    accept(SBUF("payment_counter: Payment counted."), __LINE__);
    return 0;
}`,
            jp: `#include "hookapi.h"

/**
 * Hook: payment_counter.c
 * アカウントが処理した支払いの数をカウントする。
 * カウンターをHookのステートに保存する。
 */

int64_t hook(uint32_t reserved) {
    _g(1, 1);

    // 支払い（タイプ0）のみカウントする
    int64_t tt = otxn_type();
    if (tt != 0) {
        accept(SBUF("payment_counter: 支払いではありません。"), __LINE__);
    }

    // カウンターステートのキー（32バイト、ゼロで埋める）
    uint8_t state_key[32] = { 0 };
    state_key[0] = 'C'; // 'C' はカウンター（Counter）の頭文字

    // ステートから現在のカウンター値を読み取る
    int64_t counter = 0;
    uint8_t counter_buf[8] = { 0 };
    int64_t bytes_read = state(SBUF(counter_buf), SBUF(state_key));

    if (bytes_read == 8) {
        // カウンターが既に存在する場合、その値を読み取る
        counter = *((int64_t*)counter_buf);
    }

    // カウンターをインクリメントする
    counter++;

    // 新しい値をステートに書き込む
    *((int64_t*)counter_buf) = counter;
    int64_t result = state_set(SBUF(counter_buf), SBUF(state_key));

    if (result < 0) {
        rollback(SBUF("payment_counter: ステート保存エラー。"), __LINE__);
    }

    // トランザクションを承認する
    accept(SBUF("payment_counter: 支払いカウント済み。"), __LINE__);
    return 0;
}`,
            ko: `#include "hookapi.h"

/**
 * Hook: payment_counter.c
 * 계정이 처리한 결제 수를 센다.
 * 카운터는 Hook 상태에 저장된다.
 */

int64_t hook(uint32_t reserved) {
    _g(1, 1);

    // 결제(type 0)만 카운트
    int64_t tt = otxn_type();
    if (tt != 0) {
        accept(SBUF("payment_counter: 결제가 아닙니다."), __LINE__);
    }

    // 카운터 상태 키
    uint8_t state_key[32] = { 0 };
    state_key[0] = 'C';

    int64_t counter = 0;
    uint8_t counter_buf[8] = { 0 };
    int64_t bytes_read = state(SBUF(counter_buf), SBUF(state_key));

    if (bytes_read == 8) {
        counter = *((int64_t*)counter_buf);
    }

    counter++;

    *((int64_t*)counter_buf) = counter;
    int64_t result = state_set(SBUF(counter_buf), SBUF(state_key));

    if (result < 0) {
        rollback(SBUF("payment_counter: 상태 저장 오류."), __LINE__);
    }

    accept(SBUF("payment_counter: 결제가 카운트되었습니다."), __LINE__);
    return 0;
}`,
            zh: `#include "hookapi.h"

/**
 * Hook: payment_counter.c
 * 统计账户处理过多少笔付款。
 * 计数器保存在 Hook 的状态中。
 */

int64_t hook(uint32_t reserved) {
    _g(1, 1);

    // 只统计付款（type 0）
    int64_t tt = otxn_type();
    if (tt != 0) {
        accept(SBUF("payment_counter: 这不是付款。"), __LINE__);
    }

    // 计数器状态键
    uint8_t state_key[32] = { 0 };
    state_key[0] = 'C';

    int64_t counter = 0;
    uint8_t counter_buf[8] = { 0 };
    int64_t bytes_read = state(SBUF(counter_buf), SBUF(state_key));

    if (bytes_read == 8) {
        counter = *((int64_t*)counter_buf);
    }

    counter++;

    *((int64_t*)counter_buf) = counter;
    int64_t result = state_set(SBUF(counter_buf), SBUF(state_key));

    if (result < 0) {
        rollback(SBUF("payment_counter: 保存状态时出错。"), __LINE__);
    }

    accept(SBUF("payment_counter: 付款已计数。"), __LINE__);
    return 0;
}`,
          },
        },
      ],
      slides: [
        {
          title: { es: "Sistema de estado en Hooks", en: "Hook state system", jp: "Hooksのステートシステム", ko: "Hook 상태 시스템", zh: "Hook 状态系统" },
          content: {
            es: "Datos persistentes entre ejecuciones\n\n• state() → Leer valor por clave\n• state_set() → Escribir valor\n• state_foreign() → Leer estado de otra cuenta\n\nClave: 32 bytes | Valor: hasta 256 bytes\nCada entrada vive dentro de un namespace",
            en: "Persistent data between executions\n\n• state() → Read value by key\n• state_set() → Write value\n• state_foreign() → Read state of another account\n\nKey: 32 bytes | Value: up to 256 bytes\nEach entry lives within a namespace",
            jp: "実行間の永続的なデータ\n\n• state() → キーで値を読み取る\n• state_set() → 値を書き込む\n• state_foreign() → 別のアカウントのステートを読む\n\nキー：32バイト | 値：最大256バイト\n各エントリは名前空間内に存在する",
            ko: "실행 사이에 유지되는 영속 데이터\n\n• state() → 키로 값 읽기\n• state_set() → 값 쓰기\n• state_foreign() → 다른 계정 상태 읽기\n\n키: 32바이트 | 값: 최대 256바이트\n각 항목은 namespace 안에 저장됨",
            zh: "在多次执行之间保留的持久数据\n\n• state() → 通过键读取值\n• state_set() → 写入值\n• state_foreign() → 读取其他账户的状态\n\n键：32 字节 | 值：最多 256 字节\n每一项都位于某个 namespace 内",
          },
          visual: "💾",
        },
        {
          title: { es: "Namespace y aislamiento", en: "Namespace and isolation", jp: "名前空間と分離", ko: "Namespace와 분리", zh: "Namespace 与隔离" },
          content: {
            es: "HookNamespace (32 bytes hex):\n\n• Aisla el estado de cada Hook\n• Distinto namespace = estado separado\n• Mismo namespace = estado compartido\n• Se define al instalar con SetHook\n\nstate_foreign() lee estado ajeno (solo lectura)",
            en: "HookNamespace (32 bytes hex):\n\n• Isolates state of each Hook\n• Different namespace = separate state\n• Same namespace = shared state\n• Defined at install time with SetHook\n\nstate_foreign() reads external state (read-only)",
            jp: "HookNamespace（32バイトhex）：\n\n• 各Hookのステートを分離する\n• 異なる名前空間 = 別のステート\n• 同じ名前空間 = 共有ステート\n• SetHookでインストール時に定義\n\nstate_foreign()は外部ステートを読む（読み取り専用）",
            ko: "HookNamespace(32바이트 hex):\n\n• 각 Hook의 상태를 분리\n• 다른 namespace = 별도 상태\n• 같은 namespace = 공유 상태\n• SetHook 설치 시 정의\n\nstate_foreign()은 외부 상태를 읽는 용도",
            zh: "HookNamespace（32 字节 hex）：\n\n• 用于隔离每个 Hook 的状态\n• 不同 namespace = 独立状态\n• 相同 namespace = 共享状态\n• 在 SetHook 安装时定义\n\nstate_foreign() 用于读取外部状态",
          },
          visual: "🔒",
        },
        {
          title: { es: "Usos practicos del estado", en: "Practical uses of state", jp: "ステートの実用的な用途", ko: "상태의 실전 활용", zh: "状态的实际用途" },
          content: {
            es: "• Contadores de transacciones\n• Listas blancas / negras de direcciones\n• Configuracion dinamica del Hook\n• Tracking: ultima tx, timestamps\n• Acumuladores y balances internos",
            en: "• Transaction counters\n• Address whitelists / blacklists\n• Dynamic Hook configuration\n• Tracking: last tx, timestamps\n• Accumulators and internal balances",
            jp: "• トランザクションカウンター\n• アドレスのホワイトリスト/ブラックリスト\n• Hookの動的設定\n• トラッキング：最後のtx、タイムスタンプ\n• アキュムレーターと内部残高",
            ko: "• 트랜잭션 카운터\n• 주소 화이트리스트 / 블랙리스트\n• 동적 Hook 설정\n• 마지막 tx, timestamp 추적\n• 누적값과 내부 잔액 관리",
            zh: "• 交易计数器\n• 地址白名单 / 黑名单\n• 动态 Hook 配置\n• 追踪最后一笔 tx、时间戳等\n• 累积值与内部余额管理",
          },
          visual: "📋",
        },
      ],
    },
    {
      id: "m8l4",
      title: {
        es: "Emitir transacciones desde un Hook",
        en: "Emitting transactions from a Hook",
        jp: "HookからのトランザクションのEmit",
        ko: "Hook에서 트랜잭션 발행하기",
        zh: "从 Hook 中发出交易",
      },
      theory: {
        es: `Una de las capacidades más poderosas de los Hooks es la posibilidad de **emitir transacciones nuevas** de forma autónoma. Cuando un Hook emite una transacción, esta se ejecuta como si la cuenta del Hook la hubiera enviado.

### La función emit()

La función \`emit()\` permite que un Hook cree y envíe una **transacción emitida (etxn)**. Estas transacciones:
- Son creadas por el Hook, no por un usuario
- Se ejecutan de forma autónoma en el ledger
- Pueden ser pagos, ofertas, o cualquier tipo de transacción soportado

### Reservar espacio con etxn_reserve()

Antes de emitir, debes **reservar** cuántas transacciones vas a emitir en esta ejecución:

\`\`\`
etxn_reserve(1);  // Reservar espacio para 1 emisión
\`\`\`

Esto es obligatorio. Si intentas emitir sin reservar, el Hook fallará.

### Paso a paso para emitir

1. **\`etxn_reserve(N)\`**: Reservar espacio para N emisiones
2. **Construir la transacción**: Llenar un buffer con los campos de la transacción serializada
3. **\`etxn_details()\`**: Preparar los detalles de emisión (genera el hash de emisión)
4. **\`emit()\`**: Enviar la transacción al ledger

### La función cbak()

Cuando una transacción emitida se **completa** (con éxito o fallo), Xahau llama a la función \`cbak()\` del Hook que la emitió:

- \`cbak()\` recibe información sobre el resultado de la emisión
- Puedes usar \`cbak()\` para actualizar estado, registrar resultados, o tomar acciones adicionales
- Si no necesitas hacer nada, \`cbak()\` puede simplemente retornar 0

### Casos de uso

- **Auto-forwarding**: reenviar automáticamente un porcentaje de cada pago recibido
- **Splitting**: dividir un pago entrante entre varias cuentas
- **Refunds**: devolver pagos que no cumplen ciertas condiciones
- **Acciones programadas**: emitir transacciones basadas en condiciones de estado

### Limitaciones

- Existe un **máximo de emisiones por ejecución** del Hook
- Las transacciones emitidas tienen **requisitos de fees** propios
- Las emisiones aumentan la carga computacional del Hook

### Enlaces útiles

- [Xahau Hooks 101](https://github.com/Handy4ndy/XahauHooks101): Una colección de hooks básicos para aprender a programar Hooks, entre ellos varios ejemplos de emisión por [@handy_andy](https://x.com/Handy_4ndy).
- [Xahau Hook Tx Builder](https://tx-builder.xahau.tools/): Un traductor de transacciones JSON a lenguaje C para Hooks por [@_tequ_](https://x.com/_tequ_).

`,
        en: `One of the most powerful capabilities of Hooks is the ability to **emit new transactions** autonomously. When a Hook emits a transaction, it executes as if the Hook's account had sent it.

### The emit() function

The \`emit()\` function allows a Hook to create and send an **emitted transaction (etxn)**. These transactions:
- Are created by the Hook, not by a user
- Execute autonomously on the ledger
- Can be payments, offers, or any supported transaction type

### Reserve space with etxn_reserve()

Before emitting, you must **reserve** how many transactions you're going to emit in this execution:

\`\`\`
etxn_reserve(1);  // Reserve space for 1 emission
\`\`\`

This is mandatory. If you try to emit without reserving, the Hook will fail.

### Step by step to emit

1. **\`etxn_reserve(N)\`**: Reserve space for N emissions
2. **Build the transaction**: Fill a buffer with the serialized transaction fields
3. **\`etxn_details()\`**: Prepare emission details (generates the emission hash)
4. **\`emit()\`**: Send the transaction to the ledger

### The cbak() function

When an emitted transaction **completes** (with success or failure), Xahau calls the \`cbak()\` function of the Hook that emitted it:

- \`cbak()\` receives information about the emission result
- You can use \`cbak()\` to update state, record results, or take additional actions
- If you don't need to do anything, \`cbak()\` can simply return 0

### Use cases

- **Auto-forwarding**: automatically forward a percentage of each received payment
- **Splitting**: split an incoming payment between multiple accounts
- **Refunds**: return payments that don't meet certain conditions
- **Scheduled actions**: emit transactions based on state conditions

### Limitations

- There is a **maximum number of emissions per Hook execution**
- Emitted transactions have **their own fee requirements**
- Emissions increase the Hook's computational load

### Useful links

- [Xahau Hooks 101](https://github.com/Handy4ndy/XahauHooks101): A collection of basic hooks for learning to program Hooks, including several emission examples by [@handy_andy](https://x.com/Handy_4ndy).
- [Xahau Hook Tx Builder](https://tx-builder.xahau.tools/): A JSON transaction to C language translator for Hooks by [@_tequ_](https://x.com/_tequ_).

`,
        jp: `Hooksが持つ最も強力な機能の一つは、自律的に**新しいトランザクションを発行する**能力です。HookがトランザクションをEmitすると、Hookのアカウントが送信したかのように実行されます。

### emit()関数

\`emit()\`関数は、HookがEmitトランザクション（etxn）を作成して送信することを可能にします。これらのトランザクションは：
- ユーザーではなくHookによって作成される
- レジャー上で自律的に実行される
- 支払い、オファー、またはサポートされているあらゆるトランザクションタイプになれる

### etxn_reserve()でスペースを確保する

Emitする前に、この実行で何個のトランザクションをEmitするかを**確保**する必要があります。

\`\`\`
etxn_reserve(1);  // 1回のEmitのためのスペースを確保
\`\`\`

これは必須です。確保せずにEmitしようとすると、Hookは失敗します。

### Emitのステップバイステップ

1. **\`etxn_reserve(N)\`**：N回のEmitのためのスペースを確保
2. **トランザクションを構築する**：シリアライズされたトランザクションフィールドをバッファに埋める
3. **\`etxn_details()\`**：Emit詳細を準備する（Emitハッシュを生成）
4. **\`emit()\`**：レジャーにトランザクションを送信

### cbak()関数

EmitされたトランザクションがEmitしたHookの**完了**（成功または失敗）時に、Xahauは\`cbak()\`関数を呼び出します。

- \`cbak()\`はEmit結果に関する情報を受け取る
- \`cbak()\`を使用してステートを更新したり、結果を記録したり、追加のアクションを取ったりできる
- 何もする必要がない場合、\`cbak()\`は単に0を返して良い

### ユースケース

- **自動転送**：受信した各支払いの一定割合を自動的に転送する
- **分割**：受信した支払いを複数のアカウントに分割する
- **返金**：特定の条件を満たさない支払いを返金する
- **スケジュールされたアクション**：ステート条件に基づいてトランザクションをEmitする

### 制限事項

- Hook実行あたりの**最大Emit回数**がある
- EmitされたトランザクションにはEmit**固有の手数料要件**がある
- Emitはの回数が増えるほどHookの計算負荷が増加する

### 有用なリンク

- [Xahau Hooks 101](https://github.com/Handy4ndy/XahauHooks101)：Hooksのプログラミングを学ぶための基本的なhooksのコレクション、[@handy_andy](https://x.com/Handy_4ndy)によるEmitの例を含む。
- [Xahau Hook Tx Builder](https://tx-builder.xahau.tools/)：[@_tequ_](https://x.com/_tequ_)によるHooks用のJSONトランザクションからC言語への変換ツール。

`,
        ko: `Hook의 가장 강력한 기능 중 하나는 **새 트랜잭션을 스스로 발행**할 수 있다는 점입니다. 발행된 트랜잭션은 Hook이 설치된 계정이 보낸 것처럼 처리됩니다.

### emit() 흐름

1. \`etxn_reserve(N)\` 로 발행 수 예약
2. 직렬화된 트랜잭션 버퍼 구성
3. \`etxn_details()\` 로 발행 세부정보 준비
4. \`emit()\` 으로 레저에 제출

### cbak()의 역할

발행된 트랜잭션이 완료되면 \`cbak()\` 가 호출되어 결과를 확인하고 상태를 갱신할 수 있습니다.

### 활용 예시

- 받은 결제의 일부 자동 전달
- 여러 계정으로 분할 송금
- 조건 불충족 결제 자동 환불
- 상태 기반 후속 작업 실행

강력한 기능이지만 수수료와 복잡도가 함께 올라가므로, 발행 권한과 실행 흐름을 신중히 설계해야 합니다.`,
        zh: `Hook 最强大的能力之一，是可以**自行发出新的交易**。这些交易会被当作安装了 Hook 的账户亲自发送的一样处理。

### emit() 的流程

1. 用 \`etxn_reserve(N)\` 预留发交易数量
2. 构造序列化交易缓冲区
3. 用 \`etxn_details()\` 准备发出细节
4. 用 \`emit()\` 提交到账本

### cbak() 的作用

当发出的交易完成后，\`cbak()\` 会被调用，用来检查结果并更新状态。

### 常见用途

- 自动转发收到付款的一部分
- 拆分转账到多个账户
- 对不符合条件的付款自动退款
- 基于状态触发后续动作

这个功能非常强大，但也会带来更高的费用和复杂度，因此必须谨慎设计发交易权限与执行流程。`,
      },
      codeBlocks: [
        {
          title: {
            es: "Hook que reenvía el 10% de cada pago recibido",
            en: "Hook that forwards 10% of each received payment",
            jp: "受信した各支払いの10%を転送するHook",
            ko: "받은 결제의 10%를 전달하는 Hook",
            zh: "将收到付款的 10% 自动转发的 Hook",
          },
          language: "c",
          code: {
            es: `#include "hookapi.h"

/**
 * Hook: ten_percent_forwarder.c
 *
 * Cuando la cuenta recibe un pago en XAH, reenvía automáticamente
 * el 10% a la dirección hardcodeada en forward_to[].
 *
 * ── Cómo configurar la dirección destino ─────────────────────────────────
 * La dirección debe estar en formato Account ID (20 bytes en hex),
 * NO en formato rAddress. Para convertir usa una de estas herramientas:
 *   https://hooks.services/tools/raddress-to-accountid
 *   https://transia-rnd.github.io/xrpl-hex-visualizer/
 *
 * Ejemplo:
 *   rf1NrYAsv92UPDd8nyCG4A3bez7dhYE61r
 *   → 4B50699E253C5098DEFE3A0872A79D129172F496
 *   → { 0x4BU, 0x50U, 0x69U, 0x9EU, 0x25U, 0x3CU, 0x50U, 0x98U, 0xDEU, 0xFEU, 0x3AU, 0x08U, 0x72U, 0xA7U, 0x9DU, 0x12U, 0x91U, 0x72U, 0xF4U, 0x96U }
 * ─────────────────────────────────────────────────────────────────────────
 */

int64_t hook(uint32_t reserved)
{
    //Las iteraciones de nuestro Hook, en este caso solo 1, ya que solo emitiremos una transacción y no tenemos bucles
    _g(1, 1);
    // Reservar espacio para 1 emisión
    etxn_reserve(1);

    // Dirección destino del 10% — reemplaza estos bytes con los de tu cuenta
    // rf1NrYAsv92UPDd8nyCG4A3bez7dhYE61r - Saca tu traducción en https://hooks.services/tools/raddress-to-accountid
    uint8_t forward_to[20] = {
        0x4BU, 0x50U, 0x69U, 0x9EU, 0x25U, 0x3CU, 0x50U, 0x98U, 0xDEU, 0xFEU, 0x3AU, 0x08U, 0x72U, 0xA7U, 0x9DU, 0x12U, 0x91U, 0x72U, 0xF4U, 0x96U
    };

    // Solo procesar pagos (tipo 0)
    int64_t tt = otxn_type();
    if (tt != 0)
        accept(SBUF("forwarder: no es un pago"), __LINE__);

    // Obtener el destino de la transacción entrante
    uint8_t account_field[20];
    int32_t account_field_len = otxn_field(SBUF(account_field), sfDestination);
    if (account_field_len != 20)
        accept(SBUF("forwarder: no se pudo leer el destino"), __LINE__);

    // Obtener el Account ID de la cuenta que tiene el Hook instalado
    unsigned char hook_accid[20];
    hook_account(SBUF(hook_accid));

    // Solo actuar si el Hook es el destinatario del pago (pago entrante)
    int equal = 0;
    BUFFER_EQUAL(equal, hook_accid, account_field, 20);
    if (!equal)
        accept(SBUF("forwarder: pago saliente, ignorar"), __LINE__);

    // Leer el Amount — XAH nativo ocupa exactamente 8 bytes
    unsigned char amount_buffer[48];
    int64_t amount_len = otxn_field(SBUF(amount_buffer), sfAmount);
    if (amount_len != 8)
        accept(SBUF("forwarder: no es XAH nativo"), __LINE__);

    int64_t otxn_drops = AMOUNT_TO_DROPS(amount_buffer);
    TRACEVAR(otxn_drops);

    // Calcular el 10%
    int64_t drops_to_forward = otxn_drops / 10;
    TRACEVAR(drops_to_forward);

    if (drops_to_forward < 1)
        accept(SBUF("forwarder: importe demasiado pequeño"), __LINE__);

    // Preparar y emitir el pago del 10%
    unsigned char tx[PREPARE_PAYMENT_SIMPLE_SIZE];
    PREPARE_PAYMENT_SIMPLE(tx, drops_to_forward, forward_to, 0, 0);

    uint8_t emithash[32];
    int64_t emit_result = emit(SBUF(emithash), SBUF(tx));

    if (emit_result < 0)
        rollback(SBUF("forwarder: error al emitir el pago"), __LINE__);

    accept(SBUF("forwarder: 10% reenviado correctamente"), __LINE__);
    return 0;
}`,
            en: `#include "hookapi.h"

/**
 * Hook: ten_percent_forwarder.c
 *
 * When the account receives a payment in XAH, it automatically forwards 10%
 * to the hardcoded address in forward_to[].
 *
 * ── How to configurate the destination address ─────────────────────────────────
 * The address must be in Account ID format (20 bytes in hex),
 * NOT in rAddress format. To convert, use one of these tools:
 *   https://hooks.services/tools/raddress-to-accountid
 *   https://transia-rnd.github.io/xrpl-hex-visualizer/
 *
 * Example:
 *   rf1NrYAsv92UPDd8nyCG4A3bez7dhYE61r
 *   → 4B50699E253C5098DEFE3A0872A79D129172F496
 *   → { 0x4BU, 0x50U, 0x69U, 0x9EU, 0x25U, 0x3CU, 0x50U, 0x98U, 0xDEU, 0xFEU, 0x3AU, 0x08U, 0x72U, 0xA7U, 0x9DU, 0x12U, 0x91U, 0x72U, 0xF4U, 0x96U }
 * ─────────────────────────────────────────────────────────────────────────
 */

int64_t hook(uint32_t reserved)
{
    //The hook's iterations, in this case it's 1, because there are no loops and we will only emit one transaction
    _g(1, 1);
    // Reserve 1 space for the emission
    etxn_reserve(1);

    // Destination address for 10% — Replace these bytes with yours account
    // rf1NrYAsv92UPDd8nyCG4A3bez7dhYE61r - You can get your translation here: https://hooks.services/tools/raddress-to-accountid
    uint8_t forward_to[20] = {
        0x4BU, 0x50U, 0x69U, 0x9EU, 0x25U, 0x3CU, 0x50U, 0x98U, 0xDEU, 0xFEU, 0x3AU, 0x08U, 0x72U, 0xA7U, 0x9DU, 0x12U, 0x91U, 0x72U, 0xF4U, 0x96U
    };

    // Only proceed with payment transactions (tipo 0)
    int64_t tt = otxn_type();
    if (tt != 0)
        accept(SBUF("forwarder: no es un pago"), __LINE__);

    // Obtain the destination of the incoming transaction
    uint8_t account_field[20];
    int32_t account_field_len = otxn_field(SBUF(account_field), sfDestination);
    if (account_field_len != 20)
        accept(SBUF("forwarder: not able to find the destination"), __LINE__);

    // Obtain the Account ID of the account that has the Hook installed
    unsigned char hook_accid[20];
    hook_account(SBUF(hook_accid));

    // Only proceed if the Hook is the destination of the payment (incoming payment)
    int equal = 0;
    BUFFER_EQUAL(equal, hook_accid, account_field, 20);
    if (!equal)
        accept(SBUF("forwarder: outgoing payment, ignore"), __LINE__);

    // Read the Amount — Native XAH is 8 bytes long
    unsigned char amount_buffer[48];
    int64_t amount_len = otxn_field(SBUF(amount_buffer), sfAmount);
    if (amount_len != 8)
        accept(SBUF("forwarder: It's no XAH native"), __LINE__);

    int64_t otxn_drops = AMOUNT_TO_DROPS(amount_buffer);
    TRACEVAR(otxn_drops);

    // Calcular el 10%
    int64_t drops_to_forward = otxn_drops / 10;
    TRACEVAR(drops_to_forward);

    if (drops_to_forward < 1)
        accept(SBUF("forwarder: Amount too small"), __LINE__);

    // Preparar y emitir el pago del 10%
    unsigned char tx[PREPARE_PAYMENT_SIMPLE_SIZE];
    PREPARE_PAYMENT_SIMPLE(tx, drops_to_forward, forward_to, 0, 0);

    uint8_t emithash[32];
    int64_t emit_result = emit(SBUF(emithash), SBUF(tx));

    if (emit_result < 0)
        rollback(SBUF("forwarder: error emitting the payment"), __LINE__);

    accept(SBUF("forwarder: 10% resent correctly"), __LINE__);
    return 0;
}`,
            jp: `#include "hookapi.h"

/**
 * Hook: ten_percent_forwarder.c
 *
 * アカウントがXAHで支払いを受け取ると、自動的に10%を
 * forward_to[]にハードコードされたアドレスに転送する。
 *
 * ── 転送先アドレスの設定方法 ─────────────────────────────────
 * アドレスはAccount ID形式（hexの20バイト）である必要があります。
 * rAddress形式ではありません。変換するには以下のツールを使用：
 *   https://hooks.services/tools/raddress-to-accountid
 *   https://transia-rnd.github.io/xrpl-hex-visualizer/
 *
 * 例：
 *   rf1NrYAsv92UPDd8nyCG4A3bez7dhYE61r
 *   → 4B50699E253C5098DEFE3A0872A79D129172F496
 *   → { 0x4BU, 0x50U, 0x69U, 0x9EU, 0x25U, 0x3CU, 0x50U, 0x98U, 0xDEU, 0xFEU, 0x3AU, 0x08U, 0x72U, 0xA7U, 0x9DU, 0x12U, 0x91U, 0x72U, 0xF4U, 0x96U }
 * ─────────────────────────────────────────────────────────────────────────
 */

int64_t hook(uint32_t reserved)
{
    // Hookのイテレーション数。ここでは1、ループなしで1つのトランザクションのみEmitするため
    _g(1, 1);
    // 1回のEmitのためのスペースを確保する
    etxn_reserve(1);

    // 10%の転送先アドレス — これらのバイトを自分のアカウントのものに置き換える
    // rf1NrYAsv92UPDd8nyCG4A3bez7dhYE61r - 変換はこちら: https://hooks.services/tools/raddress-to-accountid
    uint8_t forward_to[20] = {
        0x4BU, 0x50U, 0x69U, 0x9EU, 0x25U, 0x3CU, 0x50U, 0x98U, 0xDEU, 0xFEU, 0x3AU, 0x08U, 0x72U, 0xA7U, 0x9DU, 0x12U, 0x91U, 0x72U, 0xF4U, 0x96U
    };

    // 支払いトランザクション（タイプ0）のみ処理する
    int64_t tt = otxn_type();
    if (tt != 0)
        accept(SBUF("forwarder: 支払いではありません"), __LINE__);

    // 着信トランザクションの宛先を取得する
    uint8_t account_field[20];
    int32_t account_field_len = otxn_field(SBUF(account_field), sfDestination);
    if (account_field_len != 20)
        accept(SBUF("forwarder: 宛先を読み取れませんでした"), __LINE__);

    // HookがインストールされているアカウントのAccount IDを取得する
    unsigned char hook_accid[20];
    hook_account(SBUF(hook_accid));

    // Hookが支払いの受取人である場合のみ処理する（着信支払い）
    int equal = 0;
    BUFFER_EQUAL(equal, hook_accid, account_field, 20);
    if (!equal)
        accept(SBUF("forwarder: 送信支払い、無視する"), __LINE__);

    // Amountを読み取る — ネイティブXAHはちょうど8バイト
    unsigned char amount_buffer[48];
    int64_t amount_len = otxn_field(SBUF(amount_buffer), sfAmount);
    if (amount_len != 8)
        accept(SBUF("forwarder: ネイティブXAHではありません"), __LINE__);

    int64_t otxn_drops = AMOUNT_TO_DROPS(amount_buffer);
    TRACEVAR(otxn_drops);

    // 10%を計算する
    int64_t drops_to_forward = otxn_drops / 10;
    TRACEVAR(drops_to_forward);

    if (drops_to_forward < 1)
        accept(SBUF("forwarder: 金額が少なすぎます"), __LINE__);

    // 10%の支払いを準備してEmitする
    unsigned char tx[PREPARE_PAYMENT_SIMPLE_SIZE];
    PREPARE_PAYMENT_SIMPLE(tx, drops_to_forward, forward_to, 0, 0);

    uint8_t emithash[32];
    int64_t emit_result = emit(SBUF(emithash), SBUF(tx));

    if (emit_result < 0)
        rollback(SBUF("forwarder: 支払いのEmitエラー"), __LINE__);

    accept(SBUF("forwarder: 10%を正常に転送しました"), __LINE__);
    return 0;
}`,
            ko: `#include "hookapi.h"

/**
 * Hook: ten_percent_forwarder.c
 *
 * 계정이 XAH 결제를 받으면 자동으로 10%를
 * forward_to[] 에 지정된 주소로 전달한다.
 */

int64_t hook(uint32_t reserved)
{
    // 루프 없이 한 번만 발행하므로 1회 guard
    _g(1, 1);
    etxn_reserve(1);

    // 10%를 보낼 목적지 주소
    uint8_t forward_to[20] = {
        0x4BU, 0x50U, 0x69U, 0x9EU, 0x25U, 0x3CU, 0x50U, 0x98U, 0xDEU, 0xFEU, 0x3AU, 0x08U, 0x72U, 0xA7U, 0x9DU, 0x12U, 0x91U, 0x72U, 0xF4U, 0x96U
    };

    // 결제(type 0)만 처리
    int64_t tt = otxn_type();
    if (tt != 0)
        accept(SBUF("forwarder: 결제가 아닙니다"), __LINE__);

    // 들어온 트랜잭션의 목적지 확인
    uint8_t account_field[20];
    int32_t account_field_len = otxn_field(SBUF(account_field), sfDestination);
    if (account_field_len != 20)
        accept(SBUF("forwarder: 목적지를 읽을 수 없습니다"), __LINE__);

    unsigned char hook_accid[20];
    hook_account(SBUF(hook_accid));

    // Hook 계정이 실제 수신자인 경우만 처리
    int equal = 0;
    BUFFER_EQUAL(equal, hook_accid, account_field, 20);
    if (!equal)
        accept(SBUF("forwarder: 송신 결제이므로 무시"), __LINE__);

    // 네이티브 XAH 금액 읽기
    unsigned char amount_buffer[48];
    int64_t amount_len = otxn_field(SBUF(amount_buffer), sfAmount);
    if (amount_len != 8)
        accept(SBUF("forwarder: 네이티브 XAH가 아닙니다"), __LINE__);

    int64_t otxn_drops = AMOUNT_TO_DROPS(amount_buffer);
    TRACEVAR(otxn_drops);

    int64_t drops_to_forward = otxn_drops / 10;
    TRACEVAR(drops_to_forward);

    if (drops_to_forward < 1)
        accept(SBUF("forwarder: 금액이 너무 작습니다"), __LINE__);

    unsigned char tx[PREPARE_PAYMENT_SIMPLE_SIZE];
    PREPARE_PAYMENT_SIMPLE(tx, drops_to_forward, forward_to, 0, 0);

    uint8_t emithash[32];
    int64_t emit_result = emit(SBUF(emithash), SBUF(tx));

    if (emit_result < 0)
        rollback(SBUF("forwarder: 결제 발행 오류"), __LINE__);

    accept(SBUF("forwarder: 10%가 정상적으로 전달되었습니다"), __LINE__);
    return 0;
}`,
            zh: `#include "hookapi.h"

/**
 * Hook: ten_percent_forwarder.c
 *
 * 当账户收到 XAH 付款时，会自动将 10%
 * 转发到 forward_to[] 中指定的地址。
 */

int64_t hook(uint32_t reserved)
{
    // 没有循环，且只发出一笔交易，所以 guard 为 1 次
    _g(1, 1);
    etxn_reserve(1);

    // 10% 转发目标地址
    uint8_t forward_to[20] = {
        0x4BU, 0x50U, 0x69U, 0x9EU, 0x25U, 0x3CU, 0x50U, 0x98U, 0xDEU, 0xFEU, 0x3AU, 0x08U, 0x72U, 0xA7U, 0x9DU, 0x12U, 0x91U, 0x72U, 0xF4U, 0x96U
    };

    int64_t tt = otxn_type();
    if (tt != 0)
        accept(SBUF("forwarder: 这不是付款"), __LINE__);

    uint8_t account_field[20];
    int32_t account_field_len = otxn_field(SBUF(account_field), sfDestination);
    if (account_field_len != 20)
        accept(SBUF("forwarder: 无法读取目标地址"), __LINE__);

    unsigned char hook_accid[20];
    hook_account(SBUF(hook_accid));

    int equal = 0;
    BUFFER_EQUAL(equal, hook_accid, account_field, 20);
    if (!equal)
        accept(SBUF("forwarder: 这是转出付款，忽略"), __LINE__);

    unsigned char amount_buffer[48];
    int64_t amount_len = otxn_field(SBUF(amount_buffer), sfAmount);
    if (amount_len != 8)
        accept(SBUF("forwarder: 不是原生 XAH"), __LINE__);

    int64_t otxn_drops = AMOUNT_TO_DROPS(amount_buffer);
    TRACEVAR(otxn_drops);

    int64_t drops_to_forward = otxn_drops / 10;
    TRACEVAR(drops_to_forward);

    if (drops_to_forward < 1)
        accept(SBUF("forwarder: 金额太小"), __LINE__);

    unsigned char tx[PREPARE_PAYMENT_SIMPLE_SIZE];
    PREPARE_PAYMENT_SIMPLE(tx, drops_to_forward, forward_to, 0, 0);

    uint8_t emithash[32];
    int64_t emit_result = emit(SBUF(emithash), SBUF(tx));

    if (emit_result < 0)
        rollback(SBUF("forwarder: 发出付款时出错"), __LINE__);

    accept(SBUF("forwarder: 已成功转发 10%"), __LINE__);
    return 0;
}`,
          },
        },

      ],
      slides: [
        {
          title: { es: "emit() — Transacciones autonomas", en: "emit() — Autonomous transactions", jp: "emit() — 自律的なトランザクション", ko: "emit() — 자율 트랜잭션", zh: "emit() — 自主交易" },
          content: {
            es: "Los Hooks pueden crear transacciones nuevas\n\n• emit() envia transacciones al ledger\n• Se ejecutan como si la cuenta las enviara\n• Pagos, ofertas, cualquier tipo soportado\n• etxn_reserve(N) obligatorio antes de emitir",
            en: "Hooks can create new transactions\n\n• emit() sends transactions to the ledger\n• Execute as if the account sent them\n• Payments, offers, any supported type\n• etxn_reserve(N) mandatory before emitting",
            jp: "Hooksは新しいトランザクションを作成できる\n\n• emit() はレジャーにトランザクションを送信する\n• アカウントが送信したかのように実行される\n• 支払い、オファー、サポートされているあらゆるタイプ\n• etxn_reserve(N) はEmit前に必須",
            ko: "Hook은 새 트랜잭션을 만들 수 있음\n\n• emit() 으로 레저에 전송\n• 계정이 직접 보낸 것처럼 실행\n• 결제, 오퍼 등 지원되는 모든 타입 가능\n• emit 전에 etxn_reserve(N) 필수",
            zh: "Hook 可以创建新的交易\n\n• 使用 emit() 发送到账本\n• 执行方式如同账户亲自发送\n• 可用于付款、挂单等任意支持的类型\n• emit 前必须先调用 etxn_reserve(N)",
          },
          visual: "📤",
        },
        {
          title: { es: "Flujo de emision", en: "Emission flow", jp: "Emitのフロー", ko: "Emit 흐름", zh: "发出流程" },
          content: {
            es: "1. etxn_reserve(N) → Reservar espacio\n2. Construir tx serializada en buffer\n3. etxn_details() → Preparar detalles\n4. emit() → Enviar al ledger\n\ncbak() se ejecuta cuando la emision\ncompleta (exito o fallo)",
            en: "1. etxn_reserve(N) → Reserve space\n2. Build serialized tx in buffer\n3. etxn_details() → Prepare details\n4. emit() → Send to ledger\n\ncbak() executes when emission\ncompletes (success or failure)",
            jp: "1. etxn_reserve(N) → スペースを確保\n2. バッファにシリアライズされたtxを構築\n3. etxn_details() → 詳細を準備\n4. emit() → レジャーに送信\n\ncbak() はEmitが完了したときに実行\n（成功または失敗）",
            ko: "1. etxn_reserve(N) → 공간 예약\n2. 버퍼에 직렬화된 tx 구성\n3. etxn_details() → 세부정보 준비\n4. emit() → 레저에 전송\n\ncbak() 은 발행 완료 후\n성공/실패 결과를 받음",
            zh: "1. etxn_reserve(N) → 预留空间\n2. 在缓冲区中构建序列化交易\n3. etxn_details() → 准备细节\n4. emit() → 发送到账本\n\ncbak() 会在发出完成后收到\n成功或失败结果",
          },
          visual: "📝",
        },
        {
          title: { es: "Casos de uso y limitaciones", en: "Use cases and limitations", jp: "ユースケースと制限事項", ko: "활용 사례와 제한사항", zh: "使用场景与限制" },
          content: {
            es: "Casos de uso:\n• Auto-forwarding de pagos\n• Splitting entre varias cuentas\n• Refunds automaticos\n• Acciones programadas\n\nLimitaciones:\n• Maximo de emisiones por ejecucion\n• Fees propios por emision\n• _g() previene emisiones infinitas",
            en: "Use cases:\n• Auto-forwarding of payments\n• Splitting between multiple accounts\n• Automatic refunds\n• Scheduled actions\n\nLimitations:\n• Maximum emissions per execution\n• Own fees per emission\n• _g() prevents infinite emissions",
            jp: "ユースケース：\n• 支払いの自動転送\n• 複数アカウント間の分割\n• 自動返金\n• スケジュールされたアクション\n\n制限事項：\n• 実行ごとの最大Emit回数\n• Emit固有の手数料\n• _g() は無限Emitを防ぐ",
            ko: "활용 예시:\n• 결제 자동 전달\n• 여러 계정으로 분할 송금\n• 자동 환불\n• 예약된 후속 작업\n\n제한사항:\n• 실행당 발행 횟수 제한\n• 발행 자체 수수료 발생\n• _g() 가 무한 발행 방지",
            zh: "使用场景：\n• 自动转发付款\n• 拆分到多个账户\n• 自动退款\n• 计划好的后续动作\n\n限制：\n• 每次执行可发出的交易数有限\n• 发出的交易本身也会产生费用\n• _g() 可防止无限发出",
          },
          visual: "🔀",
        },
      ],
    },
    {
      id: "m8l5",
      title: {
        es: "Parámetros, funciones y gestión de Hooks",
        en: "Parameters, functions and Hook management",
        jp: "Hooksのパラメーター、関数と管理",
        ko: "파라미터, 함수, Hook 관리",
        zh: "参数、函数与 Hook 管理",
      },
      theory: {
        es: `Los Hooks disponen de múltiples funciones con propósitos distintos y de gestión. En esta lección veremos algunos de ellos.

### otxn_param() Parámetros de la transacción que para el Hook

\`otxn_param()\` lee parámetros incluidos **en la transacción que está ejecutando el Hook** en ese preciso momento (la transacción originante). A diferencia de \`hook_param\`, estos valores los envía quien realiza la transacción y **cambian en cada llamada**.

\`\`\`c
// Firma de la función
int64_t otxn_param(
    uint32_t write_ptr,  // buffer donde escribir el valor
    uint32_t write_len,  // tamaño del buffer (≥ 32 bytes recomendado)
    uint32_t read_ptr,   // buffer con el nombre del parámetro
    uint32_t read_len    // longitud del nombre
);
\`\`\`

**¿Cuándo usar otxn_param?**
- Datos dinámicos que el emisor quiere pasar al Hook en cada transacción
- Instrucciones de acción: "modo de operación", "identificador de referencia", "código de autorización"
- Cualquier valor que dependa de la transacción concreta, no de la configuración del Hook

### Diferencia clave entre hook_param y otxn_param

| | \`hook_param()\` | \`otxn_param()\` |
|---|---|---|
| **Origen** | SetHook (instalación) | Transacción que activa el Hook |
| **Quién lo pone** | El instalador del Hook | El emisor de cada tx |
| **Cuándo cambia** | Solo al actualizar el Hook | En cada transacción |
| **Uso típico** | Configuración estática | Instrucciones dinámicas |

### Cómo incluir HookParameters en una transacción desde JavaScript

Los parámetros de transacción se añaden en el campo \`HookParameters\` de cualquier tx que active el Hook. El nombre y el valor deben estar en hexadecimal:

\`\`\`javascript
// Nombre "ACCION" (hex: 414343494F4E) con valor "01" (hex)
const tx = {
  TransactionType: "Payment",
  Account: wallet.address,
  Destination: hookAccount,
  Amount: "1000000",
  HookParameters: [
    {
      HookParameter: {
        HookParameterName: "414343494F4E",  // "ACCION"
        HookParameterValue: "01",
      },
    },
  ],
};
\`\`\`

### Recursos para hacer tu vida más sencilla usando Hooks

A lo largo de tus primeros pasos desarrollando Hooks, te encontrarás con necesidades como traducir parámetros a valores legibles. Aquí tienes algunas páginas útiles:
- [Calculadora de HookOn](https://richardah.github.io/xrpl-hookon-calculator/): Calcula fácilmente el campo HookOn y HookCanEmit
- [Visualizador HEX](https://transia-rnd.github.io/xrpl-hex-visualizer/): Traduce strings a hex y viceversa en múltiples formatos
- [Visualizador de tiempo](https://transia-rnd.github.io/xrpl-time-visualizer/): Traduce entre el formato de tiempo de Xahau (Ripple Epoch) y fechas legibles
- [Servicios Hooks](https://hooks.services/): Traductores de valores y formatos relacionados con Hooks
- [Constructor de Transacciones](https://tx-builder.xahau.tools/): Genera código C para transacciones a emitir a partir de su JSON
- [XRPLWin Hook tools](https://xahau-testnet.xrplwin.com/tools): Herramientas visuales para instalar y gestionar Hooks`,
        en: `Hooks have multiple functions for different purposes and management. In this lesson we will look at some of them.

### otxn_param() Transaction parameters for the Hook

\`otxn_param()\` reads parameters included **in the transaction that is executing the Hook** at that exact moment (the originating transaction). Unlike \`hook_param\`, these values are sent by whoever performs the transaction and **change with each call**.

\`\`\`c
// Function signature
int64_t otxn_param(
    uint32_t write_ptr,  // buffer to write the value to
    uint32_t write_len,  // buffer size (≥ 32 bytes recommended)
    uint32_t read_ptr,   // buffer with the parameter name
    uint32_t read_len    // length of the name
);
\`\`\`

**When to use otxn_param?**
- Dynamic data that the sender wants to pass to the Hook with each transaction
- Action instructions: "operation mode", "reference identifier", "authorization code"
- Any value that depends on the specific transaction, not on the Hook configuration

### Key difference between hook_param and otxn_param

| | \`hook_param()\` | \`otxn_param()\` |
|---|---|---|
| **Source** | SetHook (installation) | Transaction that activates the Hook |
| **Who sets it** | The Hook installer | The sender of each tx |
| **When it changes** | Only when updating the Hook | With each transaction |
| **Typical use** | Static configuration | Dynamic instructions |

### How to include HookParameters in a transaction from JavaScript

Transaction parameters are added in the \`HookParameters\` field of any tx that activates the Hook. The name and value must be in hexadecimal:

\`\`\`javascript
// Name "ACCION" (hex: 414343494F4E) with value "01" (hex)
const tx = {
  TransactionType: "Payment",
  Account: wallet.address,
  Destination: hookAccount,
  Amount: "1000000",
  HookParameters: [
    {
      HookParameter: {
        HookParameterName: "414343494F4E",  // "ACCION"
        HookParameterValue: "01",
      },
    },
  ],
};
\`\`\`

### Resources to make your life easier using Hooks

Throughout your first steps developing Hooks, you'll encounter needs like translating parameters to readable values. Here are some useful pages:
- [HookOn Calculator](https://richardah.github.io/xrpl-hookon-calculator/): Easily calculate the HookOn and HookCanEmit fields
- [HEX Visualizer](https://transia-rnd.github.io/xrpl-hex-visualizer/): Translate strings to hex and vice versa in multiple formats
- [Time Visualizer](https://transia-rnd.github.io/xrpl-time-visualizer/): Translate between Xahau's time format (Ripple Epoch) and readable dates
- [Hooks Services](https://hooks.services/): Value and format translators related to Hooks
- [Transaction Builder](https://tx-builder.xahau.tools/): Generate C code for transactions to emit from their JSON
- [XRPLWin Hook tools](https://xahau-testnet.xrplwin.com/tools): Visual tools for installing and managing Hooks`,
        jp: `Hooksは異なる目的と管理のために複数の関数を持っています。このレッスンではそれらのいくつかを見ていきます。

### otxn_param() HookのためのトランザクションParameters

\`otxn_param()\`は、その**Hookを実行しているトランザクション**（発信元トランザクション）に含まれているParametersを読み取ります。\`hook_param\`とは異なり、これらの値はトランザクションを実行する人が送信し、**各呼び出しで変わります**。

\`\`\`c
// 関数シグネチャ
int64_t otxn_param(
    uint32_t write_ptr,  // 値を書き込むバッファ
    uint32_t write_len,  // バッファサイズ（≥ 32バイト推奨）
    uint32_t read_ptr,   // パラメーター名を持つバッファ
    uint32_t read_len    // 名前の長さ
);
\`\`\`

**otxn_paramを使う場面：**
- 送信者が各トランザクションでHookに渡したい動的データ
- アクション命令：「操作モード」、「参照識別子」、「認証コード」
- Hookの設定ではなく、特定のトランザクションに依存する値

### hook_paramとotxn_paramの主要な違い

| | \`hook_param()\` | \`otxn_param()\` |
|---|---|---|
| **ソース** | SetHook（インストール） | Hookを呼び出すトランザクション |
| **誰が設定するか** | Hookのインストーラー | 各txの送信者 |
| **いつ変わるか** | Hookを更新するときのみ | 各トランザクション毎に |
| **典型的な使用法** | 静的設定 | 動的命令 |

### JavaScriptからトランザクションにHookParametersを含める方法

トランザクションParametersは、Hookを起動する任意のtxの\`HookParameters\`フィールドに追加されます。名前と値は16進数である必要があります。

\`\`\`javascript
// 名前 "ACTION"（hex: 414354494F4E）と値 "01"（hex）
const tx = {
  TransactionType: "Payment",
  Account: wallet.address,
  Destination: hookAccount,
  Amount: "1000000",
  HookParameters: [
    {
      HookParameter: {
        HookParameterName: "414354494F4E",  // "ACTION"
        HookParameterValue: "01",
      },
    },
  ],
};
\`\`\`

### Hooksを使いやすくするためのリソース

Hooks開発の最初のステップで、パラメーターを読みやすい値に変換するなどのニーズに遭遇するでしょう。次のような便利なツールがあります。
- [HookOn計算機](https://richardah.github.io/xrpl-hookon-calculator/)：HookOnとHookCanEmitフィールドを簡単に計算する
- [HEXビジュアライザー](https://transia-rnd.github.io/xrpl-hex-visualizer/)：文字列を複数の形式でhexに変換したりその逆をしたりする
- [時間ビジュアライザー](https://transia-rnd.github.io/xrpl-time-visualizer/)：Xahauの時間形式（Ripple Epoch）と読みやすい日付を変換する
- [Hooks Services](https://hooks.services/)：Hooks関連の値と形式の変換ツール
- [Transaction Builder](https://tx-builder.xahau.tools/)：JSONからEmitするトランザクションのCコードを生成する
- [XRPLWin Hook tools](https://xahau-testnet.xrplwin.com/tools)：HooksのインストールおよびmanagemntのためのVisualツール`,
        ko: `실전 Hook 개발에서는 코드 자체뿐 아니라 **파라미터와 관리 방식**도 매우 중요합니다. 같은 Hook이라도 설정값에 따라 완전히 다르게 동작할 수 있습니다.

### \`hook_param()\` 과 \`otxn_param()\`

- \`hook_param()\`: 설치 시 \`SetHook\` 에 넣는 정적 설정
- \`otxn_param()\`: Hook을 실행한 트랜잭션이 보내는 동적 값

### 언제 쓰는가

- 고정 임계값, 주소, 모드 설정은 \`hook_param()\`
- 실행마다 바뀌는 명령, 참조값, 액션 코드는 \`otxn_param()\`

### 운영 팁

- 하드코딩보다 파라미터화를 우선
- namespace와 상태 키 규칙을 문서화
- 업데이트와 롤백 전략을 미리 고려

유틸리티 도구를 함께 활용하면 HookOn 계산, hex 변환, 시간 변환, 트랜잭션 생성이 훨씬 쉬워집니다.`,
        zh: `在实际 Hook 开发中，除了代码本身，**参数与管理方式**也非常重要。即使是同一个 Hook，也可能因为配置不同而表现完全不同。

### \`hook_param()\` 与 \`otxn_param()\`

- \`hook_param()\`：安装时通过 \`SetHook\` 写入的静态配置
- \`otxn_param()\`：触发 Hook 的交易附带的动态值

### 什么时候使用

- 固定阈值、固定地址、模式配置适合用 \`hook_param()\`
- 每次执行都变化的命令、引用值、动作代码适合用 \`otxn_param()\`

### 运营建议

- 优先参数化，而不是硬编码
- 文档化 namespace 与状态键规则
- 提前考虑更新与回滚策略

如果结合使用实用工具，HookOn 计算、hex 转换、时间转换和交易构建都会轻松很多。`,
      },
      codeBlocks: [
        {
          title: {
            es: "Hook que lee un otxn_param y lo muestra con TRACE",
            en: "Hook that reads an otxn_param and displays it with TRACE",
            jp: "otxn_paramを読み取りTRACEで表示するHook",
            ko: "otxn_param을 읽어 TRACE로 보여주는 Hook",
            zh: "读取 otxn_param 并用 TRACE 显示的 Hook",
          },
          language: "c",
          code: {
            es: `#include "hookapi.h"

/**
 * Hook: otxn_param_demo.c
 *
 * Lee el parámetro "ACCION" de la transacción que activa el Hook
 * y muestra su valor por el Debug Stream con trace().
 *
 * Para probarlo, envía una transacción con HookParameters:
 *   HookParameterName:  "414343494F4E"  (= "ACCION" en hex)
 *   HookParameterValue: "01"            (cualquier valor hex)
 *
 * Convierte strings a hex en: https://transia-rnd.github.io/xrpl-hex-visualizer/
 */

int64_t hook(uint32_t reserved)
{
    // Guard obligatorio: (id_iteracion, max_iteraciones)
    // Como no hay bucles en este Hook, basta con _g(1, 1)
    _g(1, 1);

    // Traza de inicio con 4 argumentos: (label_ptr, label_len, data_ptr, data_len, as_hex)
    // Cuando data_ptr y data_len son 0, solo se imprime la etiqueta
    trace(SBUF("otxn_param_demo: hook() iniciado"), 0, 0, 0);

    // ── Definir el nombre del parámetro a buscar ──────────────────────────────
    // "ACCION" en ASCII: A=41 C=43 C=43 I=49 O=4F N=4E
    // Usa https://transia-rnd.github.io/xrpl-hex-visualizer/ para convertir tus propios nombres,
    uint8_t param_name[]    = { 0x41U, 0x43U, 0x43U, 0x49U, 0x4FU, 0x4EU };

    // Buffer de salida donde otxn_param() escribirá el valor encontrado (máx. 32 bytes)
    uint8_t param_value[32] = { 0 };

    // ── Leer el parámetro de la transacción originante ────────────────────────
    // otxn_param() busca en los HookParameters de la tx que activó este Hook.
    // Devuelve: bytes escritos (>0) si encontrado | negativo si error o no existe
    int64_t value_len = otxn_param(
        SBUF(param_value),   // buffer donde se escribe el valor del parámetro
        SBUF(param_name)     // nombre del parámetro que queremos leer
    );

    // ── Trazar el nombre del parámetro buscado ────────────────────────────────
    // TRACEVAR muestra el nombre de la variable y su contenido como valor numérico
    TRACEVAR(param_name);
    // TRACEHEX muestra el contenido del buffer en formato hexadecimal
    // Verás: 414343494F4E → que corresponde a "ACCION"
    TRACEHEX(param_name);

    // ── Trazar el valor recibido ──────────────────────────────────────────────
    // TRACEVAR del valor — útil para ver si el buffer tiene algo o está a ceros
    TRACEVAR(param_value);
    // TRACEHEX del valor — muestra los bytes exactos que envió el emisor de la tx
    TRACEHEX(param_value);

    // ── Mostrar el valor en dos formatos con trace() de 5 argumentos ─────────
    // trace(label_ptr, label_len, data_ptr, data_len, as_hex)
    //   as_hex = 0 → interpreta data como texto ASCII (legible si el valor es texto)
    //   as_hex = 1 → muestra data como cadena hexadecimal (siempre legible)

    // Como texto: útil cuando el valor es un string ("ON", "OFF", "MODO1", etc.)
    trace(SBUF("otxn_param_demo: valor ACCION (texto): "), SBUF(param_value), 0);

    // Como hex: siempre muestra los bytes exactos, ideal para valores binarios
    trace(SBUF("otxn_param_demo: valor ACCION (hex): "),   SBUF(param_value), 1);

    // Acepta la transacción. __LINE__ indica el número de línea exacto en el log,
    // lo que facilita saber por qué camino salió el Hook en el Debug Stream
    accept(SBUF("otxn_param_demo: parametro leido y trazado"), __LINE__);
    return 0;
}`,
            en: `#include "hookapi.h"

/**
 * Hook: otxn_param_demo.c
 *
 * Read the "ACTION" parameter from the transaction that triggered the Hook
 * and display its value in the Debug Stream using trace().
 *
 * Para probarlo, envía una transacción con HookParameters:
 *   HookParameterName:  "414354494F4E"  (= "ACTION" en hex)
 *   HookParameterValue: "01"            (any hex value)
 *
 * Convert strings to hex: https://transia-rnd.github.io/xrpl-hex-visualizer/
 */

int64_t hook(uint32_t reserved)
{
    // Mandatory Guard : (id_iteration, max_iterations)
    // There are no loops, so _g(1, 1)
    _g(1, 1);

    // Initial trace with 4 arguments:: (label_ptr, label_len, data_ptr, data_len, as_hex)
    // When data_ptr and data_len are 0, only the label is printed
    trace(SBUF("otxn_param_demo: hook() initiated"), 0, 0, 0);

    // ── Define the name of the parameter to look for ──────────────────────────────
    // "ACTION" to ASCII: A=41 C=43 T=54 I=49 O=4F N=4E
    // Use https://transia-rnd.github.io/xrpl-hex-visualizer/ to convert your own names,
    uint8_t param_name[]    = { 0x41U, 0x43U, 0x54U, 0x49U, 0x4FU, 0x4EU };

    // Outgoing buffer where otxn_param() will write the found value (max. 32 bytes)
    uint8_t param_value[32] = { 0 };

    // ── Read the originating transaction parameter ────────────────────────
    // otxn_param() looks in the HookParameters of the transaction that activated this Hook.
    // Returns: bytes written (>0) if found | negative if error or does not exist
    int64_t value_len = otxn_param(
        SBUF(param_value),   // buffer where the parameter value is written
        SBUF(param_name)     // name of the parameter we want to read
    );

    // ── Trace the name of the parameter being searched for ────────────────────────────────
    // TRACEVAR displays the variable name and its content as a numeric value
    TRACEVAR(param_name);
    // TRACEHEX displays the buffer contents in hexadecimal format
    // 414354494F4E → matchs "ACTION"
    TRACEHEX(param_name);

    // ── Trace the value received ──────────────────────────────────────────────
    // TRACEVAR of the value — useful for seeing if the buffer has anything in it or is at zero
    TRACEVAR(param_value);
    // TRACEHEX of value — shows the exact bytes sent by the sender of the tx
    TRACEHEX(param_value);

    // ── Display the value in two formats using a 5-argument trace() ─────────
    // trace(label_ptr, label_len, data_ptr, data_len, as_hex)
    //   as_hex = 0 → interprets data as ASCII text (readable if the value is text)
    //   as_hex = 1 → displays data as a hexadecimal string (always readable)

    // As text: useful when the value is a string ("ON", "OFF", "MODE1", etc.)
    trace(SBUF("otxn_param_demo: ACTION value (text): "), SBUF(param_value), 0);

    // As hex: always displays the exact bytes, ideal for binary values
    trace(SBUF("otxn_param_demo: ACTION value (hex): "),   SBUF(param_value), 1);

    // Accept the transaction. __LINE__ indicates the exact line number in the log.
    // This makes it easier to know which path the Hook took in the Debug Stream
    accept(SBUF("otxn_param_demo: parameter read and plotted"), __LINE__);
    return 0;
}`,
            jp: `#include "hookapi.h"

/**
 * Hook: otxn_param_demo.c
 *
 * Hookを起動したトランザクションから "ACTION" パラメーターを読み取り
 * trace()を使ってDebug Streamに値を表示する。
 *
 * テストするには、HookParametersを持つトランザクションを送信する：
 *   HookParameterName:  "414354494F4E"  (= hex の "ACTION")
 *   HookParameterValue: "01"            (任意のhex値)
 *
 * 文字列をhexに変換: https://transia-rnd.github.io/xrpl-hex-visualizer/
 */

int64_t hook(uint32_t reserved)
{
    // 必須ガード: (イテレーションID, 最大イテレーション数)
    // このHookにはループがないため _g(1, 1) で十分
    _g(1, 1);

    // 4引数での初期トレース: (label_ptr, label_len, data_ptr, data_len, as_hex)
    // data_ptrとdata_lenが0の場合、ラベルのみが出力される
    trace(SBUF("otxn_param_demo: hook() 開始"), 0, 0, 0);

    // ── 検索するパラメーター名を定義する ──────────────────────────────
    // "ACTION" のASCII: A=41 C=43 T=54 I=49 O=4F N=4E
    // https://transia-rnd.github.io/xrpl-hex-visualizer/ で独自の名前を変換できる
    uint8_t param_name[]    = { 0x41U, 0x43U, 0x54U, 0x49U, 0x4FU, 0x4EU };

    // otxn_param()が見つかった値を書き込む出力バッファ（最大32バイト）
    uint8_t param_value[32] = { 0 };

    // ── 発信元トランザクションパラメーターを読み取る ────────────────────────
    // otxn_param()はこのHookを起動したtxのHookParametersを検索する。
    // 返り値: 見つかった場合は書き込まれたバイト数(>0) | エラーまたは存在しない場合は負の値
    int64_t value_len = otxn_param(
        SBUF(param_value),   // パラメーター値が書き込まれるバッファ
        SBUF(param_name)     // 読み取りたいパラメーター名
    );

    // ── 検索しているパラメーター名をトレースする ────────────────────────────────
    // TRACEVARは変数名とその内容を数値として表示する
    TRACEVAR(param_name);
    // TRACEHEXはバッファの内容を16進数形式で表示する
    // 表示: 414354494F4E → "ACTION"に対応
    TRACEHEX(param_name);

    // ── 受け取った値をトレースする ──────────────────────────────────────────────
    // 値のTRACEVAR — バッファに何かあるかゼロかを確認するのに便利
    TRACEVAR(param_value);
    // 値のTRACEHEX — txの送信者が送った正確なバイトを表示
    TRACEHEX(param_value);

    // ── 5引数のtrace()を使って値を2つの形式で表示する ─────────
    // trace(label_ptr, label_len, data_ptr, data_len, as_hex)
    //   as_hex = 0 → データをASCIIテキストとして解釈（値がテキストの場合に読みやすい）
    //   as_hex = 1 → データを16進数文字列として表示（常に読みやすい）

    // テキストとして: 値が文字列の場合に便利（"ON"、"OFF"、"MODE1"など）
    trace(SBUF("otxn_param_demo: ACTION値（テキスト）: "), SBUF(param_value), 0);

    // hexとして: 常に正確なバイトを表示、バイナリ値に最適
    trace(SBUF("otxn_param_demo: ACTION値（hex）: "),   SBUF(param_value), 1);

    // トランザクションを承認する。__LINE__はログの正確な行番号を示す。
    // これによりDebug StreamでHookがどのパスを通ったかを確認しやすくなる
    accept(SBUF("otxn_param_demo: パラメーターを読み取りトレースしました"), __LINE__);
    return 0;
}`,
            ko: `#include "hookapi.h"

/**
 * Hook: otxn_param_demo.c
 *
 * Hook을 실행한 트랜잭션에서 "ACTION" 파라미터를 읽고
 * trace()로 Debug Stream에 출력한다.
 */

int64_t hook(uint32_t reserved)
{
    _g(1, 1);
    trace(SBUF("otxn_param_demo: hook() 시작"), 0, 0, 0);

    uint8_t param_name[]    = { 0x41U, 0x43U, 0x54U, 0x49U, 0x4FU, 0x4EU };
    uint8_t param_value[32] = { 0 };

    int64_t value_len = otxn_param(
        SBUF(param_value),
        SBUF(param_name)
    );

    TRACEVAR(param_name);
    TRACEHEX(param_name);
    TRACEVAR(param_value);
    TRACEHEX(param_value);
    TRACEVAR(value_len);

    trace(SBUF("otxn_param_demo: ACTION 값(텍스트): "), SBUF(param_value), 0);
    trace(SBUF("otxn_param_demo: ACTION 값(hex): "), SBUF(param_value), 1);

    accept(SBUF("otxn_param_demo: 파라미터를 읽고 추적했습니다"), __LINE__);
    return 0;
}`,
            zh: `#include "hookapi.h"

/**
 * Hook: otxn_param_demo.c
 *
 * 读取触发 Hook 的交易中的 "ACTION" 参数，
 * 并通过 trace() 输出到 Debug Stream。
 */

int64_t hook(uint32_t reserved)
{
    _g(1, 1);
    trace(SBUF("otxn_param_demo: hook() 已启动"), 0, 0, 0);

    uint8_t param_name[]    = { 0x41U, 0x43U, 0x54U, 0x49U, 0x4FU, 0x4EU };
    uint8_t param_value[32] = { 0 };

    int64_t value_len = otxn_param(
        SBUF(param_value),
        SBUF(param_name)
    );

    TRACEVAR(param_name);
    TRACEHEX(param_name);
    TRACEVAR(param_value);
    TRACEHEX(param_value);
    TRACEVAR(value_len);

    trace(SBUF("otxn_param_demo: ACTION 值（文本）: "), SBUF(param_value), 0);
    trace(SBUF("otxn_param_demo: ACTION 值（hex）: "), SBUF(param_value), 1);

    accept(SBUF("otxn_param_demo: 参数已读取并追踪"), __LINE__);
    return 0;
}`,
          },
        },
        {
          title: {
            es: "Enviar una transacción con HookParameters desde JavaScript",
            en: "Send a transaction with HookParameters from JavaScript",
            jp: "JavaScriptからHookParameters付きトランザクションを送信する",
            ko: "JavaScript에서 HookParameters 포함 트랜잭션 보내기",
            zh: "从 JavaScript 发送带 HookParameters 的交易",
          },
          language: "javascript",
          code: {
            es: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

async function enviarConParametro() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, { algorithm: "secp256k1" });

  // La cuenta que tiene el Hook instalado (puede ser la misma u otra)
  const HOOK_ACCOUNT = "rAddressOfHookAccount"; // Reemplaza con la cuenta que tiene el Hook instalado

  // Convertir el nombre y valor del parámetro a hexadecimal
  // "ACCION" → 414343494F4E  (usa https://hooks.services/tools/string-to-hex)
  const paramName  = Buffer.from("ACCION").toString("hex").toUpperCase();
  const paramValue = "D204"; // Valor 1234 en Hex 

  const tx = {
    TransactionType: "Payment",
    Account: wallet.address,
    Destination: HOOK_ACCOUNT,
    Amount: "1000000", // 1 XAH en drops
    HookParameters: [
      {
        HookParameter: {
          HookParameterName:  paramName,   // "414343494F4E"
          HookParameterValue: paramValue,  // "01"
        },
      },
    ],
  };

  console.log("Enviando Payment con HookParameters...");
  console.log("  Nombre param (hex): ", paramName, " = ACCION");
  console.log("  Valor param  (hex): ", paramValue);

  const prepared = await client.autofill(tx);
  const signed   = wallet.sign(prepared);
  const result   = await client.submitAndWait(signed.tx_blob);

  const txResult = result.result.meta.TransactionResult;
  console.log("Resultado:", txResult);

  if (txResult === "tesSUCCESS") {
    console.log("TX enviada. Revisa el Debug Stream en Hooks Builder");
    console.log("Deberías ver las trazas del Hook con el valor del parámetro de tu cuenta. "+wallet.address);
  }

  await client.disconnect();
}

// Enviar con acción 01
enviarConParametro();`,
            en: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

async function sendParameters() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, { algorithm: "secp256k1" });

  // The Hook installed address
  const HOOK_ACCOUNT = "rAddressOfHookAccount";

  // Translate the name and value to hex
  // "ACTION" → 414354494F4E  (use https://hooks.services/tools/string-to-hex)
  const paramName  = Buffer.from("ACTION").toString("hex").toUpperCase();
  const paramValue = "68656C6C6F"; // hello value in Hex 

  const tx = {
    TransactionType: "Payment",
    Account: wallet.address,
    Destination: HOOK_ACCOUNT,
    Amount: "1000000", // 1 XAH en drops
    HookParameters: [
      {
        HookParameter: {
          HookParameterName:  paramName,   // "414354494F4E"
          HookParameterValue: paramValue,  // "68656C6C6F"
        },
      },
    ],
  };

  console.log("Sending Payment with HookParameters...");
  console.log("  Nombre param (hex): ", paramName, " = ACTION");
  console.log("  Valor param  (hex): ", paramValue);

  const prepared = await client.autofill(tx);
  const signed   = wallet.sign(prepared);
  const result   = await client.submitAndWait(signed.tx_blob);

  const txResult = result.result.meta.TransactionResult;
  console.log("Result:", txResult);

  if (txResult === "tesSUCCESS") {
    console.log("TX sent. Check the Debug Stream in Hooks Builder");
    console.log("You should see Hook traces with the parameter value from your account: "+wallet.address);
  }

  await client.disconnect();
}


sendParameters();`,
            jp: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

async function sendParameters() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, { algorithm: "secp256k1" });

  // Hookがインストールされたアドレス
  const HOOK_ACCOUNT = "rAddressOfHookAccount";

  // 名前と値をhexに変換する
  // "ACTION" → 414354494F4E  (https://hooks.services/tools/string-to-hex を使用)
  const paramName  = Buffer.from("ACTION").toString("hex").toUpperCase();
  const paramValue = "68656C6C6F"; // hello のhex値

  const tx = {
    TransactionType: "Payment",
    Account: wallet.address,
    Destination: HOOK_ACCOUNT,
    Amount: "1000000", // 1 XAH（drops単位）
    HookParameters: [
      {
        HookParameter: {
          HookParameterName:  paramName,   // "414354494F4E"
          HookParameterValue: paramValue,  // "68656C6C6F"
        },
      },
    ],
  };

  console.log("HookParameters付きPaymentを送信中...");
  console.log("  パラメーター名（hex）: ", paramName, " = ACTION");
  console.log("  パラメーター値（hex）: ", paramValue);

  const prepared = await client.autofill(tx);
  const signed   = wallet.sign(prepared);
  const result   = await client.submitAndWait(signed.tx_blob);

  const txResult = result.result.meta.TransactionResult;
  console.log("結果:", txResult);

  if (txResult === "tesSUCCESS") {
    console.log("TX送信済み。Hooks BuilderのDebug Streamを確認してください");
    console.log("あなたのアカウントからのパラメーター値でHookのトレースが表示されるはずです: "+wallet.address);
  }

  await client.disconnect();
}


sendParameters();`,
            ko: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

async function sendParameters() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, { algorithm: "secp256k1" });

  // Hook이 설치된 계정 주소
  const HOOK_ACCOUNT = "rAddressOfHookAccount";

  // 이름과 값을 hex로 변환
  const paramName  = Buffer.from("ACTION").toString("hex").toUpperCase();
  const paramValue = "68656C6C6F"; // hello

  const tx = {
    TransactionType: "Payment",
    Account: wallet.address,
    Destination: HOOK_ACCOUNT,
    Amount: "1000000",
    HookParameters: [
      {
        HookParameter: {
          HookParameterName:  paramName,
          HookParameterValue: paramValue,
        },
      },
    ],
  };

  console.log("HookParameters가 포함된 Payment 전송 중...");
  console.log("  파라미터 이름(hex): ", paramName, " = ACTION");
  console.log("  파라미터 값(hex): ", paramValue);

  const prepared = await client.autofill(tx);
  const signed   = wallet.sign(prepared);
  const result   = await client.submitAndWait(signed.tx_blob);

  const txResult = result.result.meta.TransactionResult;
  console.log("결과:", txResult);

  if (txResult === "tesSUCCESS") {
    console.log("TX 전송 완료. Hooks Builder의 Debug Stream을 확인하세요");
    console.log("계정에서 보낸 파라미터 값이 Hook trace에 표시되어야 합니다: " + wallet.address);
  }

  await client.disconnect();
}

sendParameters();`,
            zh: `require("dotenv").config();
const { Client, Wallet } = require("xahau");

async function sendParameters() {
  const client = new Client("wss://xahau-test.net");
  await client.connect();

  const wallet = Wallet.fromSeed(process.env.WALLET_SEED, { algorithm: "secp256k1" });

  const HOOK_ACCOUNT = "rAddressOfHookAccount";

  const paramName  = Buffer.from("ACTION").toString("hex").toUpperCase();
  const paramValue = "68656C6C6F";

  const tx = {
    TransactionType: "Payment",
    Account: wallet.address,
    Destination: HOOK_ACCOUNT,
    Amount: "1000000",
    HookParameters: [
      {
        HookParameter: {
          HookParameterName:  paramName,
          HookParameterValue: paramValue,
        },
      },
    ],
  };

  console.log("正在发送带 HookParameters 的 Payment...");
  console.log("  参数名(hex): ", paramName, " = ACTION");
  console.log("  参数值(hex): ", paramValue);

  const prepared = await client.autofill(tx);
  const signed   = wallet.sign(prepared);
  const result   = await client.submitAndWait(signed.tx_blob);

  const txResult = result.result.meta.TransactionResult;
  console.log("结果:", txResult);

  if (txResult === "tesSUCCESS") {
    console.log("TX 已发送，请检查 Hooks Builder 的 Debug Stream");
    console.log("你应该能看到来自该账户参数值的 Hook trace: " + wallet.address);
  }

  await client.disconnect();
}

sendParameters();`,
          },
        },
      ],
      slides: [
        {
          title: { es: "hook_param vs otxn_param", en: "hook_param vs otxn_param", jp: "hook_param vs otxn_param", ko: "hook_param vs otxn_param", zh: "hook_param vs otxn_param" },
          content: {
            es: "Dos sistemas de parámetros distintos:\n\nhook_param() — configuración estática\n• Se define en SetHook al instalar\n• Almacenado junto al Hook en el ledger\n• Cambia solo al actualizar el Hook\n• Ideal para umbrales, direcciones fijas\n\notxn_param() — datos dinámicos\n• Viene en la transacción que activa el Hook\n• Lo envía el emisor de cada tx\n• Cambia en cada ejecución\n• Ideal para instrucciones, modos, referencias",
            en: "Two different parameter systems:\n\nhook_param() — static configuration\n• Defined in SetHook at installation\n• Stored alongside the Hook in the ledger\n• Changes only when updating the Hook\n• Ideal for thresholds, fixed addresses\n\notxn_param() — dynamic data\n• Comes in the transaction that activates the Hook\n• Sent by the sender of each tx\n• Changes with each execution\n• Ideal for instructions, modes, references",
            jp: "2つの異なるParameterシステム：\n\nhook_param() — 静的設定\n• インストール時のSetHookで定義\n• レジャーのHookと一緒に保存\n• Hookを更新するときのみ変更\n• 閾値、固定アドレスに最適\n\notxn_param() — 動的データ\n• Hookを起動するトランザクションに含まれる\n• 各txの送信者が送信する\n• 各実行で変わる\n• 命令、モード、参照に最適",
            ko: "두 가지 파라미터 시스템:\n\nhook_param() — 정적 설정\n• 설치 시 SetHook에서 정의\n• Hook과 함께 레저에 저장\n• Hook 업데이트 때만 변경\n• 임계값, 고정 주소에 적합\n\notxn_param() — 동적 데이터\n• Hook을 실행한 트랜잭션에 포함\n• 각 tx 발신자가 전달\n• 실행마다 달라짐\n• 명령, 모드, 참조값에 적합",
            zh: "两种不同的参数系统：\n\nhook_param() — 静态配置\n• 在安装时通过 SetHook 定义\n• 与 Hook 一起存储在账本中\n• 仅在更新 Hook 时变化\n• 适合阈值、固定地址\n\notxn_param() — 动态数据\n• 包含在触发 Hook 的交易中\n• 由每笔 tx 的发送者提供\n• 每次执行都可能变化\n• 适合命令、模式、引用值",
          },
          visual: "🎛️",
        },
        {
          title: { es: "otxn_param: firma y retornos", en: "otxn_param: signature and return values", jp: "otxn_param：シグネチャと戻り値", ko: "otxn_param: 시그니처와 반환값", zh: "otxn_param：签名与返回值" },
          content: {
            es: "int64_t otxn_param(\n  write_ptr, write_len,  // buffer salida\n  read_ptr,  read_len    // nombre del param\n);\n\nRetornos:\n• > 0 → bytes escritos (encontrado)\n• DOESNT_EXIST → no está en la tx\n• TOO_SMALL → nombre vacío\n• TOO_BIG → nombre > 32 bytes\n• OUT_OF_BOUNDS → punteros inválidos\n\nNombre y valor en HEX en la transacción",
            en: "int64_t otxn_param(\n  write_ptr, write_len,  // output buffer\n  read_ptr,  read_len    // param name\n);\n\nReturn values:\n• > 0 → bytes written (found)\n• DOESNT_EXIST → not in the tx\n• TOO_SMALL → empty name\n• TOO_BIG → name > 32 bytes\n• OUT_OF_BOUNDS → invalid pointers\n\nName and value in HEX in the transaction",
            jp: "int64_t otxn_param(\n  write_ptr, write_len,  // 出力バッファ\n  read_ptr,  read_len    // パラメーター名\n);\n\n戻り値：\n• > 0 → 書き込まれたバイト数（見つかった）\n• DOESNT_EXIST → txに存在しない\n• TOO_SMALL → 空の名前\n• TOO_BIG → 名前が32バイト超\n• OUT_OF_BOUNDS → 無効なポインター\n\nトランザクション内の名前と値はHEXで",
            ko: "int64_t otxn_param(\n  write_ptr, write_len,  // 출력 버퍼\n  read_ptr,  read_len    // 파라미터 이름\n);\n\n반환값:\n• > 0 → 기록된 바이트 수(찾음)\n• DOESNT_EXIST → tx에 없음\n• TOO_SMALL → 빈 이름\n• TOO_BIG → 이름이 32바이트 초과\n• OUT_OF_BOUNDS → 잘못된 포인터\n\n트랜잭션 안의 이름과 값은 HEX 형식",
            zh: "int64_t otxn_param(\n  write_ptr, write_len,  // 输出缓冲区\n  read_ptr,  read_len    // 参数名\n);\n\n返回值：\n• > 0 → 已写入的字节数（找到）\n• DOESNT_EXIST → 交易中不存在\n• TOO_SMALL → 名称为空\n• TOO_BIG → 名称超过 32 字节\n• OUT_OF_BOUNDS → 指针无效\n\n交易中的名称和值都使用 HEX 格式",
          },
          visual: "📨",
        },
        {
          title: { es: "Namespace y recursos", en: "Namespace and resources", jp: "Namespaceとリソース", ko: "Namespace와 리소스", zh: "Namespace 与资源" },
          content: {
            es: "HookNamespace (32 bytes hex):\n• Distinto namespace = estado aislado\n• Mismo namespace = estado compartido\n• SHA-256 del nombre → namespace único\n\nRecursos:\n• hooks.services → string ↔ hex\n• HookOn calculator\n• Visualizador tiempo (Ripple Epoch)\n• tx-builder.xahau.tools → C desde JSON",
            en: "HookNamespace (32 bytes hex):\n• Different namespace = isolated state\n• Same namespace = shared state\n• SHA-256 of name → unique namespace\n\nResources:\n• hooks.services → string ↔ hex\n• HookOn calculator\n• Time visualizer (Ripple Epoch)\n• tx-builder.xahau.tools → C from JSON",
            jp: "HookNamespace（32バイトhex）：\n• 異なる名前空間 = 分離されたステート\n• 同じ名前空間 = 共有ステート\n• 名前のSHA-256 → ユニークな名前空間\n\nリソース：\n• hooks.services → 文字列 ↔ hex\n• HookOn計算機\n• 時間ビジュアライザー（Ripple Epoch）\n• tx-builder.xahau.tools → JSONからC言語",
            ko: "HookNamespace(32바이트 hex):\n• 다른 namespace = 분리된 상태\n• 같은 namespace = 공유 상태\n• 이름의 SHA-256 → 고유 namespace\n\n리소스:\n• hooks.services → 문자열 ↔ hex\n• HookOn 계산기\n• Ripple Epoch 시간 변환기\n• tx-builder.xahau.tools → JSON을 C로 변환",
            zh: "HookNamespace（32 字节 hex）：\n• 不同 namespace = 隔离状态\n• 相同 namespace = 共享状态\n• 名称的 SHA-256 → 唯一 namespace\n\n资源：\n• hooks.services → 字符串 ↔ hex\n• HookOn 计算器\n• Ripple Epoch 时间转换器\n• tx-builder.xahau.tools → 从 JSON 生成 C",
          },
          visual: "🔧",
        },
      ],
    },
    {
      id: "m8l6",
      title: {
        es: "Trazabilidad y debugging de Hooks",
        en: "Hook tracing and debugging",
        jp: "Hooksのトレースとデバッグ",
        ko: "Hook 추적과 디버깅",
        zh: "Hook 的追踪与调试",
      },
      theory: {
        es: `Cuando un Hook falla o se comporta de forma inesperada, necesitas una forma de **observar su ejecución interna**. El sistema de Hooks proporciona tres funciones de traza que emiten mensajes visibles en el **Debug Stream** de Hooks Builder y en los logs del nodo \`xahaud\`.

### trace() Mensaje de texto o buffer en hexadecimal

La función más general. Emite un mensaje de cadena o el contenido de un buffer en formato hex.

\`\`\`c
// Emitir un mensaje de texto plano
trace(SBUF("hook iniciado correctamente"), 0);  // 0 = mostrar como string

// Emitir el contenido de un buffer en hexadecimal
uint8_t account_buf[20];
otxn_field(SBUF(account_buf), sfAccount);
trace(SBUF(account_buf), 1);                    // 1 = mostrar como hex
\`\`\`

El tercer argumento controla el formato de salida:
- \`0\` → imprime el buffer como texto (útil para mensajes)
- \`1\` → imprime el buffer como hexadecimal (útil para datos binarios: cuentas, hashes, buffers de transacciones)

### trace_num() Mensaje + número entero

Emite una etiqueta descriptiva junto a un valor numérico entero. Ideal para inspeccionar cantidades en drops, contadores, valores de retorno de funciones y códigos de error.

\`\`\`c
int64_t drops = AMOUNT_TO_DROPS(amount_buf);
trace_num(SBUF("drops recibidos: "), drops);

// Ver el valor de retorno de una función para detectar errores
int64_t result = state_set(SBUF(counter_buf), SBUF(state_key));
trace_num(SBUF("state_set resultado: "), result);
// Negativo = error; positivo o cero = éxito
\`\`\`

### trace_float() Mensaje + número en coma flotante (XFL)

Los Hooks usan el formato **XFL** (eXtended Float) para representar cantidades no enteras. \`trace_float()\` formatea el XFL de forma legible en el Debug Stream.

\`\`\`c
// Obtener el amount como XFL desde un slot
int64_t slot_no = slot_set(SBUF(amount_buf), 0);
int64_t xfl_amount = slot_float(slot_no);
trace_float(SBUF("importe en XFL: "), xfl_amount);
\`\`\`

### macro.h: Macros de debug disponibles en Hooks Builder

Hooks Builder incluye el archivo \`macro.h\` con cuatro macros de conveniencia que envuelven las funciones \`trace*\` y solo se activan cuando la constante \`DEBUG\` está definida. Esto permite dejar las trazas en el código y eliminarlas de un solo golpe en producción simplemente sin definiendo \`DEBUG\`.

\`\`\`c
// Muestra el nombre de la variable y su valor como número entero (int64)
#define TRACEVAR(v)  if (DEBUG) trace_num((uint32_t)(#v), (uint32_t)(sizeof(#v) - 1), (int64_t)v);

// Muestra el nombre de la variable y el contenido del buffer en hexadecimal
#define TRACEHEX(v)  if (DEBUG) trace((uint32_t)(#v), (uint32_t)(sizeof(#v) - 1), (uint32_t)(v), (uint32_t)(sizeof(v)), 1);

// Muestra el nombre de la variable y su valor como float XFL (eXtended Float)
#define TRACEXFL(v)  if (DEBUG) trace_float((uint32_t)(#v), (uint32_t)(sizeof(#v) - 1), (int64_t)v);

// Muestra el nombre de la variable y el contenido del buffer como texto ASCII
#define TRACESTR(v)  if (DEBUG) trace((uint32_t)(#v), (uint32_t)(sizeof(#v) - 1), (uint32_t)(v), sizeof(v), 0);
\`\`\`

**Cómo funcionan internamente:**

Todas usan el operador \`#v\` (stringification de C) para convertir el nombre de la variable en una cadena literal que actúa de etiqueta. Así, \`TRACEVAR(drops)\` imprimirá \`"drops = 5000000"\` sin que tengas que escribir la etiqueta a mano.

| Macro | Función interna | Cuándo usarla |
|---|---|---|
| \`TRACEVAR(v)\` | \`trace_num()\` | Enteros: drops, contadores, códigos de retorno |
| \`TRACEHEX(v)\` | \`trace(... as_hex=1)\` | Buffers binarios: account IDs, hashes, claves |
| \`TRACEXFL(v)\` | \`trace_float()\` | Valores XFL (importes en coma flotante) |
| \`TRACESTR(v)\` | \`trace(... as_hex=0)\` | Buffers de texto: parámetros, memos ASCII |

**Activar y desactivar el modo debug:**

\`\`\`c
// Al inicio del archivo, antes de incluir macro.h
#define DEBUG 1       // Trazas activas — modo desarrollo
// #define DEBUG 0    // Trazas desactivadas — modo producción

#include "hookapi.h"
// macro.h está disponible en Hooks Builder automáticamente
\`\`\`

Cuando \`DEBUG\` es \`0\` o no está definido, el compilador elimina completamente las macros del WASM generado: no hay coste de fees ni de tamaño.

**Ejemplo de uso:**

\`\`\`c
uint8_t param_name[] = { 0x41U, 0x43U };   // "AC"
int64_t drops        = 5000000;
int64_t xfl_val      = float_set(0, drops);

TRACEVAR(drops);       // → "drops = 5000000"
TRACEHEX(param_name);  // → "param_name = 4143"
TRACEXFL(xfl_val);     // → "xfl_val = 5000000.0"
TRACESTR(param_name);  // → "param_name = AC"
\`\`\`

### ¿Dónde aparecen las trazas?

Las trazas son visibles en **Hooks Builder → Debug Stream**: Selecciona la cuenta en el desplegable y verás todas las trazas en tiempo real para cada transacción procesada.

### Trucos para mejorar el debugging

**1. Usa \`__LINE__\` como código de error en accept/rollback**

El segundo argumento de \`accept()\` y \`rollback()\` es un código numérico. Usar \`__LINE__\` automáticamente incluye el número de línea del código fuente, lo que te permite saber exactamente dónde terminó la ejecución sin leer los logs línea a línea.

\`\`\`c
accept(SBUF("min_payment: OK"), __LINE__);    // Sabrás que pasó por aquí
rollback(SBUF("min_payment: FAIL"), __LINE__); // Y que falló aquí
\`\`\`

**2. Prefijos descriptivos en los mensajes**

Usa un prefijo con el nombre del Hook en cada mensaje. Con varios Hooks en la misma cuenta, es fácil confundir qué Hook emitió cada traza.

\`\`\`c
trace(SBUF("mi_hook:inicio hook()"), 0);
trace(SBUF("mi_hook:tipo tx procesado"), 0);
trace(SBUF("mi_hook:aceptando"), 0);
\`\`\`

**3. Traza el valor de retorno de cada función crítica**

Todas las funciones de la API de Hooks devuelven un valor negativo en caso de error. Comprueba siempre el retorno de operaciones importantes para no perder errores silenciosos.

\`\`\`c
int64_t r = state_set(SBUF(val), SBUF(key));
trace_num(SBUF("state_set: "), r);  // Si r < 0, algo falló

int64_t r2 = emit(SBUF(emithash), SBUF(tx_buf));
trace_num(SBUF("emit resultado: "), r2);
\`\`\`

**4. Traza buffers binarios como hex**

Las cuentas, los hashes y los buffers de transacciones son datos binarios de 20-32 bytes. Mostrarlos como hex te permite compararlos con las direcciones y hashes que ves en los exploradores de bloques.

\`\`\`c
uint8_t hook_acc[20];
hook_account(SBUF(hook_acc));
trace(SBUF(hook_acc), 1);  // Verás el account ID en hex (40 caracteres)
\`\`\`

**5. Marca las ramas de ejecución**

Añade una traza al inicio de cada rama \`if/else\` para seguir el flujo de ejecución. Cuando el Hook termina inesperadamente, verás hasta qué traza llegó antes de que parara.

\`\`\`c
if (tt == 0) {
    trace(SBUF("rama: es un pago"), 0);
    // ...
} else {
    trace(SBUF("rama: no es un pago, saliendo"), 0);
    accept(SBUF("ok"), __LINE__);
}
\`\`\`

**6. Traza en cbak() para depurar emisiones**

Cuando una transacción emitida falla silenciosamente, es difícil saberlo sin instrumentar \`cbak()\`.

\`\`\`c
int64_t cbak(uint32_t reserved) {
    _g(1, 1);
    uint8_t txtype[4];
    int64_t t = otxn_type();
    trace_num(SBUF("cbak: tipo de tx emitida: "), t);
    // Leer el resultado de la tx emitida
    int64_t result = otxn_field(...);
    trace_num(SBUF("cbak: resultado emission: "), result);
    return 0;
}
\`\`\`

**7. Elimina las trazas antes de ir a producción**

Las trazas tienen un coste en fees de ejecución y aumentan el tamaño del WASM. Una vez que el Hook funciona correctamente en testnet, elimina o comenta las llamadas a \`trace*\` antes de desplegarlo en Mainnet.`,
        en: `When a Hook fails or behaves unexpectedly, you need a way to **observe its internal execution**. The Hooks system provides three trace functions that emit messages visible in the **Debug Stream** of Hooks Builder and in the \`xahaud\` node logs.

### trace() Text message or buffer in hexadecimal

The most general function. Emits a string message or the contents of a buffer in hex format.

\`\`\`c
// Emit a plain text message
trace(SBUF("hook started correctly"), 0);  // 0 = show as string

// Emit the content of a buffer in hexadecimal
uint8_t account_buf[20];
otxn_field(SBUF(account_buf), sfAccount);
trace(SBUF(account_buf), 1);                    // 1 = show as hex
\`\`\`

The third argument controls the output format:
- \`0\` → prints the buffer as text (useful for messages)
- \`1\` → prints the buffer as hexadecimal (useful for binary data: accounts, hashes, transaction buffers)

### trace_num() Message + integer number

Emits a descriptive label along with an integer numeric value. Ideal for inspecting amounts in drops, counters, function return values and error codes.

\`\`\`c
int64_t drops = AMOUNT_TO_DROPS(amount_buf);
trace_num(SBUF("drops received: "), drops);

// See the return value of a function to detect errors
int64_t result = state_set(SBUF(counter_buf), SBUF(state_key));
trace_num(SBUF("state_set result: "), result);
// Negative = error; positive or zero = success
\`\`\`

### trace_float() Message + floating point number (XFL)

Hooks use the **XFL** (eXtended Float) format to represent non-integer amounts. \`trace_float()\` formats the XFL in a readable way in the Debug Stream.

\`\`\`c
// Get the amount as XFL from a slot
int64_t slot_no = slot_set(SBUF(amount_buf), 0);
int64_t xfl_amount = slot_float(slot_no);
trace_float(SBUF("amount in XFL: "), xfl_amount);
\`\`\`

### macro.h: Debug macros available in Hooks Builder

Hooks Builder includes the \`macro.h\` file with four convenience macros that wrap the \`trace*\` functions and only activate when the \`DEBUG\` constant is defined. This allows leaving traces in the code and removing them all at once in production simply by not defining \`DEBUG\`.

\`\`\`c
// Shows the variable name and its value as an integer (int64)
#define TRACEVAR(v)  if (DEBUG) trace_num((uint32_t)(#v), (uint32_t)(sizeof(#v) - 1), (int64_t)v);

// Shows the variable name and buffer content in hexadecimal
#define TRACEHEX(v)  if (DEBUG) trace((uint32_t)(#v), (uint32_t)(sizeof(#v) - 1), (uint32_t)(v), (uint32_t)(sizeof(v)), 1);

// Shows the variable name and its value as XFL float (eXtended Float)
#define TRACEXFL(v)  if (DEBUG) trace_float((uint32_t)(#v), (uint32_t)(sizeof(#v) - 1), (int64_t)v);

// Shows the variable name and buffer content as ASCII text
#define TRACESTR(v)  if (DEBUG) trace((uint32_t)(#v), (uint32_t)(sizeof(#v) - 1), (uint32_t)(v), sizeof(v), 0);
\`\`\`

**How they work internally:**

All use the \`#v\` operator (C stringification) to convert the variable name into a literal string that acts as a label. So, \`TRACEVAR(drops)\` will print \`"drops = 5000000"\` without you having to write the label manually.

| Macro | Internal function | When to use it |
|---|---|---|
| \`TRACEVAR(v)\` | \`trace_num()\` | Integers: drops, counters, return codes |
| \`TRACEHEX(v)\` | \`trace(... as_hex=1)\` | Binary buffers: account IDs, hashes, keys |
| \`TRACEXFL(v)\` | \`trace_float()\` | XFL values (floating point amounts) |
| \`TRACESTR(v)\` | \`trace(... as_hex=0)\` | Text buffers: parameters, ASCII memos |

**Activating and deactivating debug mode:**

\`\`\`c
// At the beginning of the file, before including macro.h
#define DEBUG 1       // Traces active — development mode
// #define DEBUG 0    // Traces disabled — production mode

#include "hookapi.h"
// macro.h is available in Hooks Builder automatically
\`\`\`

When \`DEBUG\` is \`0\` or not defined, the compiler completely removes the macros from the generated WASM: no fee cost or size increase.

**Usage example:**

\`\`\`c
uint8_t param_name[] = { 0x41U, 0x43U };   // "AC"
int64_t drops        = 5000000;
int64_t xfl_val      = float_set(0, drops);

TRACEVAR(drops);       // → "drops = 5000000"
TRACEHEX(param_name);  // → "param_name = 4143"
TRACEXFL(xfl_val);     // → "xfl_val = 5000000.0"
TRACESTR(param_name);  // → "param_name = AC"
\`\`\`

### Where do traces appear?

Traces are visible in **Hooks Builder → Debug Stream**: Select the account from the dropdown and you'll see all traces in real time for each processed transaction.

### Tips for better debugging

**1. Use \`__LINE__\` as error code in accept/rollback**

The second argument of \`accept()\` and \`rollback()\` is a numeric code. Using \`__LINE__\` automatically includes the source code line number, allowing you to know exactly where execution ended without reading logs line by line.

\`\`\`c
accept(SBUF("min_payment: OK"), __LINE__);    // You'll know it passed through here
rollback(SBUF("min_payment: FAIL"), __LINE__); // And that it failed here
\`\`\`

**2. Descriptive prefixes in messages**

Use a prefix with the Hook name in each message. With multiple Hooks on the same account, it's easy to confuse which Hook emitted each trace.

\`\`\`c
trace(SBUF("my_hook:hook() start"), 0);
trace(SBUF("my_hook:tx type processed"), 0);
trace(SBUF("my_hook:accepting"), 0);
\`\`\`

**3. Trace the return value of each critical function**

All Hooks API functions return a negative value on error. Always check the return of important operations to avoid silent errors.

\`\`\`c
int64_t r = state_set(SBUF(val), SBUF(key));
trace_num(SBUF("state_set: "), r);  // If r < 0, something failed

int64_t r2 = emit(SBUF(emithash), SBUF(tx_buf));
trace_num(SBUF("emit result: "), r2);
\`\`\`

**4. Trace binary buffers as hex**

Accounts, hashes and transaction buffers are binary data of 20-32 bytes. Showing them as hex lets you compare them with the addresses and hashes you see in block explorers.

\`\`\`c
uint8_t hook_acc[20];
hook_account(SBUF(hook_acc));
trace(SBUF(hook_acc), 1);  // You'll see the account ID in hex (40 characters)
\`\`\`

**5. Mark execution branches**

Add a trace at the start of each \`if/else\` branch to follow the execution flow. When the Hook ends unexpectedly, you'll see which trace it reached before stopping.

\`\`\`c
if (tt == 0) {
    trace(SBUF("branch: is a payment"), 0);
    // ...
} else {
    trace(SBUF("branch: not a payment, exiting"), 0);
    accept(SBUF("ok"), __LINE__);
}
\`\`\`

**6. Trace in cbak() to debug emissions**

When an emitted transaction fails silently, it's difficult to know without instrumenting \`cbak()\`.

\`\`\`c
int64_t cbak(uint32_t reserved) {
    _g(1, 1);
    uint8_t txtype[4];
    int64_t t = otxn_type();
    trace_num(SBUF("cbak: emitted tx type: "), t);
    // Read the result of the emitted tx
    int64_t result = otxn_field(...);
    trace_num(SBUF("cbak: emission result: "), result);
    return 0;
}
\`\`\`

**7. Remove traces before going to production**

Traces have an execution fee cost and increase WASM size. Once the Hook works correctly on testnet, remove or comment out the \`trace*\` calls before deploying it to Mainnet.`,
        jp: `Hookが失敗したり予期しない動作をする場合、**その内部実行を観察する**方法が必要です。Hooksシステムは、Hooks BuilderのDebug Streamと\`xahaud\`ノードログに表示されるメッセージをEmitする3つのトレース関数を提供します。

### trace() テキストメッセージまたはhexのバッファ

最も一般的な関数。文字列メッセージまたはバッファの内容をhex形式でEmitします。

\`\`\`c
// テキストメッセージをEmit
trace(SBUF("hook started correctly"), 0);  // 0 = 文字列として表示

// バッファの内容を16進数でEmit
uint8_t account_buf[20];
otxn_field(SBUF(account_buf), sfAccount);
trace(SBUF(account_buf), 1);                    // 1 = hexとして表示
\`\`\`

3番目の引数は出力形式を制御します：
- \`0\` → バッファをテキストとして出力（メッセージに便利）
- \`1\` → バッファを16進数として出力（バイナリデータに便利：アカウント、ハッシュ、トランザクションバッファ）

### trace_num() メッセージ + 整数値

説明的なラベルとともに整数数値をEmitします。drops単位の金額、カウンター、関数の戻り値、エラーコードの検査に最適です。

\`\`\`c
int64_t drops = AMOUNT_TO_DROPS(amount_buf);
trace_num(SBUF("drops received: "), drops);

// エラーを検出するために関数の戻り値を確認する
int64_t result = state_set(SBUF(counter_buf), SBUF(state_key));
trace_num(SBUF("state_set result: "), result);
// 負の値 = エラー; 正またはゼロ = 成功
\`\`\`

### trace_float() メッセージ + 浮動小数点数（XFL）

Hooksは**XFL**（eXtended Float）フォーマットを使って非整数の金額を表現します。\`trace_float()\`はXFLをDebug Streamで読みやすい形式にフォーマットします。

\`\`\`c
// スロットからXFLとしてamountを取得する
int64_t slot_no = slot_set(SBUF(amount_buf), 0);
int64_t xfl_amount = slot_float(slot_no);
trace_float(SBUF("amount in XFL: "), xfl_amount);
\`\`\`

### macro.h：Hooks Builderで利用可能なデバッグマクロ

Hooks Builderには、\`trace*\`関数をラップし、\`DEBUG\`定数が定義されているときのみ有効になる4つの便利なマクロを持つ\`macro.h\`ファイルが含まれています。これにより、コードにトレースを残し、\`DEBUG\`を定義しないだけで本番環境で一度に削除できます。

\`\`\`c
// 変数名とその値を整数（int64）として表示する
#define TRACEVAR(v)  if (DEBUG) trace_num((uint32_t)(#v), (uint32_t)(sizeof(#v) - 1), (int64_t)v);

// 変数名とバッファの内容を16進数で表示する
#define TRACEHEX(v)  if (DEBUG) trace((uint32_t)(#v), (uint32_t)(sizeof(#v) - 1), (uint32_t)(v), (uint32_t)(sizeof(v)), 1);

// 変数名とその値をXFLフロート（eXtended Float）として表示する
#define TRACEXFL(v)  if (DEBUG) trace_float((uint32_t)(#v), (uint32_t)(sizeof(#v) - 1), (int64_t)v);

// 変数名とバッファの内容をASCIIテキストとして表示する
#define TRACESTR(v)  if (DEBUG) trace((uint32_t)(#v), (uint32_t)(sizeof(#v) - 1), (uint32_t)(v), sizeof(v), 0);
\`\`\`

**内部の仕組み：**

すべて\`#v\`演算子（Cの文字列化）を使って変数名をラベルとして機能するリテラル文字列に変換します。したがって、\`TRACEVAR(drops)\`はラベルを手動で書かなくても\`"drops = 5000000"\`を出力します。

| マクロ | 内部関数 | いつ使うか |
|---|---|---|
| \`TRACEVAR(v)\` | \`trace_num()\` | 整数：drops、カウンター、戻りコード |
| \`TRACEHEX(v)\` | \`trace(... as_hex=1)\` | バイナリバッファ：アカウントID、ハッシュ、キー |
| \`TRACEXFL(v)\` | \`trace_float()\` | XFL値（浮動小数点の金額） |
| \`TRACESTR(v)\` | \`trace(... as_hex=0)\` | テキストバッファ：パラメーター、ASCIIメモ |

**デバッグモードの有効化と無効化：**

\`\`\`c
// ファイルの先頭、macro.hのinclude前に
#define DEBUG 1       // トレース有効 — 開発モード
// #define DEBUG 0    // トレース無効 — 本番モード

#include "hookapi.h"
// macro.hはHooks Builderで自動的に利用可能
\`\`\`

\`DEBUG\`が\`0\`または未定義の場合、コンパイラは生成されたWASMからマクロを完全に削除します。手数料コストやサイズの増加もありません。

**使用例：**

\`\`\`c
uint8_t param_name[] = { 0x41U, 0x43U };   // "AC"
int64_t drops        = 5000000;
int64_t xfl_val      = float_set(0, drops);

TRACEVAR(drops);       // → "drops = 5000000"
TRACEHEX(param_name);  // → "param_name = 4143"
TRACEXFL(xfl_val);     // → "xfl_val = 5000000.0"
TRACESTR(param_name);  // → "param_name = AC"
\`\`\`

### トレースはどこに表示されるか？

トレースは**Hooks Builder → Debug Stream**に表示されます：ドロップダウンからアカウントを選択すると、処理された各トランザクションのすべてのトレースをリアルタイムで確認できます。

### デバッグをより良くするためのヒント

**1. accept/rollbackで\`__LINE__\`をエラーコードとして使用する**

\`accept()\`と\`rollback()\`の2番目の引数は数値コードです。\`__LINE__\`を使用すると、ソースコードの行番号が自動的に含まれ、ログを行ごとに読まなくても実行がどこで終了したかを正確に知ることができます。

\`\`\`c
accept(SBUF("min_payment: OK"), __LINE__);    // ここを通ったことがわかる
rollback(SBUF("min_payment: FAIL"), __LINE__); // ここで失敗したことがわかる
\`\`\`

**2. メッセージに説明的なプレフィックスを使用する**

各メッセージにHook名のプレフィックスを使用します。同じアカウントに複数のHooksがある場合、どのHookが各トレースをEmitしたかを混同しやすいです。

\`\`\`c
trace(SBUF("my_hook:hook() start"), 0);
trace(SBUF("my_hook:tx type processed"), 0);
trace(SBUF("my_hook:accepting"), 0);
\`\`\`

**3. 各重要な関数の戻り値をトレースする**

すべてのHooks API関数はエラー時に負の値を返します。サイレントエラーを見逃さないよう、重要な操作の戻り値を常に確認します。

\`\`\`c
int64_t r = state_set(SBUF(val), SBUF(key));
trace_num(SBUF("state_set: "), r);  // rが< 0なら何かが失敗した

int64_t r2 = emit(SBUF(emithash), SBUF(tx_buf));
trace_num(SBUF("emit result: "), r2);
\`\`\`

**4. バイナリバッファをhexとしてトレースする**

アカウント、ハッシュ、トランザクションバッファは20〜32バイトのバイナリデータです。hexとして表示することで、ブロックエクスプローラーで見るアドレスやハッシュと比較できます。

\`\`\`c
uint8_t hook_acc[20];
hook_account(SBUF(hook_acc));
trace(SBUF(hook_acc), 1);  // アカウントIDをhexで確認できる（40文字）
\`\`\`

**5. 実行ブランチをマークする**

各\`if/else\`ブランチの先頭にトレースを追加して実行フローを追います。Hookが予期せず終了したとき、停止する前にどのトレースまで到達したかがわかります。

\`\`\`c
if (tt == 0) {
    trace(SBUF("branch: is a payment"), 0);
    // ...
} else {
    trace(SBUF("branch: not a payment, exiting"), 0);
    accept(SBUF("ok"), __LINE__);
}
\`\`\`

**6. Emitのデバッグのためにcbakをトレースする**

Emitされたトランザクションがサイレントに失敗する場合、\`cbak()\`をトレースなしに知ることは難しいです。

\`\`\`c
int64_t cbak(uint32_t reserved) {
    _g(1, 1);
    uint8_t txtype[4];
    int64_t t = otxn_type();
    trace_num(SBUF("cbak: emitted tx type: "), t);
    // Emitされたtxの結果を読み取る
    int64_t result = otxn_field(...);
    trace_num(SBUF("cbak: emitted tx result: "), result);
    return 0;
}
\`\`\`

**7. 本番環境に移行する前にトレースを削除する**

トレースには実行手数料コストがあり、WASMのサイズを増加させます。HookがTestnetで正しく機能したら、Mainnetにデプロイする前に\`trace*\`の呼び出しを削除またはコメントアウトします。`,
        ko: `Hook이 실패하거나 예상과 다르게 동작할 때는 **내부 실행을 관찰할 방법**이 필요합니다. 이를 위해 Hooks는 여러 추적 함수를 제공합니다.

### 주요 함수

- \`trace()\`: 문자열이나 버퍼 출력
- \`trace_num()\`: 라벨과 정수 출력
- \`trace_float()\`: XFL 부동소수 표현 출력

### 어디서 보나?

- Hooks Builder의 **Debug Stream**
- 로컬 \`xahaud\` 노드 로그
- WebSocket과 트랜잭션 메타데이터

### 실전 팁

- \`accept()\`, \`rollback()\` 에 \`__LINE__\` 사용
- 모든 메시지에 Hook 이름 prefix 추가
- 중요한 함수 반환값은 \`trace_num()\` 으로 확인
- 바이너리 버퍼는 hex 형식으로 출력
- \`emit()\` 을 쓴다면 \`cbak()\` 도 함께 추적

디버깅 출력은 학습과 테스트에는 매우 유용하지만, 메인넷 배포 전에는 정리하는 것이 좋습니다.`,
        zh: `当 Hook 失败或行为异常时，你需要一种方法来**观察其内部执行过程**。为此，Hooks 提供了多种追踪函数。

### 核心追踪函数

- \`trace()\`：输出普通文本或十六进制缓冲区
- \`trace_num()\`：输出标签和整数值
- \`trace_float()\`：输出标签和 XFL 浮点值

### 在哪里查看

- Hooks Builder 的 **Debug Stream**
- 本地 \`xahaud\` 节点日志
- WebSocket 与交易元数据

### 调试建议

- 在 \`accept()\` / \`rollback()\` 中使用 \`__LINE__\`
- 所有消息统一加上 Hook 名称前缀
- 关键函数返回值都用 \`trace_num()\` 打印
- 二进制缓冲区用 hex 模式输出
- 在每个 if/else 分支入口增加 trace
- 调试 \`emit()\` 时也要给 \`cbak()\` 增加追踪

调试输出在学习和测试时非常有用，但在部署到主网前最好清理掉。`,
      },
      codeBlocks: [
        {
          title: {
            es: "Hook instrumentado con todas las funciones de traza",
            en: "Hook instrumented with all trace functions",
            jp: "すべてのトレース関数を利用したHook",
            ko: "모든 trace 함수를 사용하는 Hook",
            zh: "使用全部 trace 函数的 Hook",
          },
          language: "c",
          code: {
            es: `#include "hookapi.h"

/**
 * Hook: debug_demo.c
 *
 * Objetivo:
 *  - Demostrar el uso de trace(), trace_num() y trace_float()
 *    para inspeccionar la ejecución del Hook en tiempo real.
 *  - Solo acepta pagos en XAH (monto nativo en 8 bytes).
 *
 * Importante (por tu error de compilación):
 *  - En el HookAPI actual, trace() requiere 5 argumentos:
 *      trace(msg_ptr, msg_len, data_ptr, data_len, as_hex)
 *
 *    Por eso NO vale:
 *      trace(SBUF("hola"), 0);     // <- 3 args (2 + 1)
 *
 *    Lo correcto para "solo mensaje" es:
 *      trace(SBUF("hola"), 0, 0, 0);
 *
 *    Y para "mensaje + buffer en hex":
 *      trace(SBUF("label: "), SBUF(buffer), 1);
 */

int64_t hook(uint32_t reserved)
{
    _g(1, 1);

    // ── 1. Traza de inicio (solo mensaje) ───────────────────────────────────
    trace(SBUF("debug_demo:hook() iniciado"), 0, 0, 0);

    // ── 2. Trazar la cuenta donde está instalado el Hook ────────────────────
    // hook_account() llena 20 bytes con el AccountID (raw)
    uint8_t hook_acc[20];
    hook_account(SBUF(hook_acc));

    // Mostrarlo como HEX. Ponemos un mensaje "label" y el buffer a la derecha.
    trace(SBUF("debug_demo:hook_account (20 bytes): "), SBUF(hook_acc), 1);

    // ── 3. Tipo de transacción entrante ─────────────────────────────────────
    // otxn_type() devuelve el tipo numérico. En Hooks:
    //  0 = Payment
    int64_t tt = otxn_type();
    trace_num(SBUF("debug_demo:tipo de tx (0=Payment): "), tt);

    // Si no es Payment, no hacemos nada “malo”: simplemente aceptamos y salimos.
    if (tt != 0)
    {
        trace(SBUF("debug_demo:no es un pago — saliendo"), 0, 0, 0);
        accept(SBUF("debug_demo:ok (no payment)"), __LINE__);
    }

    trace(SBUF("debug_demo:rama pago alcanzada"), 0, 0, 0);

    // ── 4. Obtener el Amount del Payment ────────────────────────────────────
    // En Xahau, sfAmount:
    //  - Si es nativo (XAH), otxn_field devuelve 8 bytes.
    //  - Si es IOU/token, devuelve más (no 8).
    unsigned char amount_buf[48];
    int64_t amount_len = otxn_field(SBUF(amount_buf), sfAmount);
    trace_num(SBUF("debug_demo:bytes leidos del Amount: "), amount_len);

    // Solo permitimos XAH nativo. Si no es de 8 bytes, rechazamos.
    if (amount_len != 8)
    {
        trace(SBUF("debug_demo:Amount no es XAH (8 bytes) — rechazando"), 0, 0, 0);
        rollback(SBUF("debug_demo:solo XAH nativo"), __LINE__);
    }

    // ── 5. Trazar el valor en drops ─────────────────────────────────────────
    // amount_buf contiene el Amount nativo codificado; AMOUNT_TO_DROPS lo pasa a int64 (drops)
    int64_t drops = AMOUNT_TO_DROPS(amount_buf);
    trace_num(SBUF("debug_demo:drops recibidos: "), drops);

    // ── 6. Aceptar y terminar ───────────────────────────────────────────────
    // __LINE__ te deja rastrear exactamente desde qué línea saliste
    trace(SBUF("debug_demo:pago aceptado, saliendo"), 0, 0, 0);
    accept(SBUF("debug_demo:ok"), __LINE__);

    // Nunca llega aquí porque accept/rollback terminan el hook,
    // pero lo dejamos por buena forma.
    return 0;
}`,
            en: `#include "hookapi.h"

/**
 * Hook: debug_demo.c
 *
 * Goal:
 *  - How to use trace(), trace_num() and trace_float() to inspect the Hook execution in real time.
 *  - Only accepts payments in XAH (native amount in 8 bytes).
 */

int64_t hook(uint32_t reserved)
{
    _g(1, 1);

    // ── 1. Initial trace (message only) ───────────────────────────────────
    trace(SBUF("debug_demo:hook() initiated"), 0, 0, 0);

    // ── 2. Trace the account where the Hook is installed ────────────────────
    // hook_account() fills  20 bytes with the AccountID (raw)
    uint8_t hook_acc[20];
    hook_account(SBUF(hook_acc));

    // Show it as HEX. Put "label" and the buffer to the right.
    trace(SBUF("debug_demo:hook_account (20 bytes): "), SBUF(hook_acc), 1);

    // ── 3. Type of transaction ─────────────────────────────────────
    // otxn_type() returns a number type. In Hooks:
    //  0 = Payment
    int64_t tt = otxn_type();
    trace_num(SBUF("debug_demo:tx type (0=Payment): "), tt);

    // If it's not Payment, we leave.
    if (tt != 0)
    {
        trace(SBUF("debug_demo:not a payment — exiting"), 0, 0, 0);
        accept(SBUF("debug_demo:ok (no payment)"), __LINE__);
    }

    trace(SBUF("debug_demo:payment branch reached"), 0, 0, 0);

    // ── 4. Obtain Amount of Payment ────────────────────────────────────
    // In Xahau, sfAmount:
    //  - If its (XAH), otxn_field returns 8 bytes.
    //  - If its an IOU/token, returns more (no 8).
    unsigned char amount_buf[48];
    int64_t amount_len = otxn_field(SBUF(amount_buf), sfAmount);
    trace_num(SBUF("debug_demo:bytes read from Amount: "), amount_len);

    // Only XAH allowed. If not, we deny.
    if (amount_len != 8)
    {
        trace(SBUF("debug_demo:Amount not XAH (8 bytes) — rejecting"), 0, 0, 0);
        rollback(SBUF("debug_demo:only XAH native"), __LINE__);
    }

    // ── 5. Trace the value in drops ─────────────────────────────────────────
    // amount_buf contains the Amount coded; AMOUNT_TO_DROPS translates to int64 (drops)
    int64_t drops = AMOUNT_TO_DROPS(amount_buf);
    trace_num(SBUF("debug_demo:drops received: "), drops);

    // ── 6. Accept and finish ───────────────────────────────────────────────
    // __LINE__ allows you to track exactly from which line you exited
    trace(SBUF("debug_demo:payment accepted, exiting"), 0, 0, 0);
    accept(SBUF("debug_demo:ok"), __LINE__);

    // Never reaches here because accept/rollback finish the  hook,
    return 0;
}`,
            jp: `#include "hookapi.h"

/**
 * Hook: debug_demo.c
 *
 * 目標：
 *  - trace()、trace_num()、trace_float()を使って
 *    Hookの実行をリアルタイムで検査する方法を示す。
 *  - XAH（8バイトのネイティブ金額）の支払いのみを承認する。
 */

int64_t hook(uint32_t reserved)
{
    _g(1, 1);

    // ── 1. 初期トレース（メッセージのみ）───────────────────────────────────
    trace(SBUF("debug_demo:hook() 開始"), 0, 0, 0);

    // ── 2. Hookがインストールされているアカウントをトレースする ────────────────────
    // hook_account() はAccountID（RAW）で20バイトを埋める
    uint8_t hook_acc[20];
    hook_account(SBUF(hook_acc));

    // HEXとして表示する。「ラベル」とバッファを右側に置く。
    trace(SBUF("debug_demo:hook_account（20バイト）: "), SBUF(hook_acc), 1);

    // ── 3. 受信トランザクションのタイプ ─────────────────────────────────────
    // otxn_type()は数値タイプを返す。Hooksでは：
    //  0 = Payment
    int64_t tt = otxn_type();
    trace_num(SBUF("debug_demo:txタイプ（0=Payment）: "), tt);

    // Paymentでない場合は終了する
    if (tt != 0)
    {
        trace(SBUF("debug_demo:支払いではない — 終了"), 0, 0, 0);
        accept(SBUF("debug_demo:ok（支払いなし）"), __LINE__);
    }

    trace(SBUF("debug_demo:支払いブランチに到達"), 0, 0, 0);

    // ── 4. PaymentのAmountを取得する ────────────────────────────────────
    // Xahauでは、sfAmount：
    //  - ネイティブ（XAH）の場合、otxn_fieldは8バイトを返す。
    //  - IOU/tokenの場合、より多く返す（8ではない）。
    unsigned char amount_buf[48];
    int64_t amount_len = otxn_field(SBUF(amount_buf), sfAmount);
    trace_num(SBUF("debug_demo:Amountから読み取ったバイト数: "), amount_len);

    // ネイティブXAHのみを許可する。8バイトでない場合は拒否する。
    if (amount_len != 8)
    {
        trace(SBUF("debug_demo:AmountはXAHではない（8バイト）— 拒否"), 0, 0, 0);
        rollback(SBUF("debug_demo:ネイティブXAHのみ"), __LINE__);
    }

    // ── 5. drops単位の値をトレースする ─────────────────────────────────────────
    // amount_bufにはエンコードされたネイティブAmountが含まれる; AMOUNT_TO_DROPSがint64（drops）に変換
    int64_t drops = AMOUNT_TO_DROPS(amount_buf);
    trace_num(SBUF("debug_demo:受信したdrops: "), drops);

    // ── 6. 承認して終了する ───────────────────────────────────────────────
    // __LINE__を使うとどの行から終了したかを正確にトレースできる
    trace(SBUF("debug_demo:支払いを承認、終了"), 0, 0, 0);
    accept(SBUF("debug_demo:ok"), __LINE__);

    // accept/rollbackがhookを終了させるのでここには到達しない
    return 0;
}`,
            ko: `#include "hookapi.h"

/**
 * Hook: debug_demo.c
 *
 * 목표:
 *  - trace(), trace_num(), trace_float() 로 Hook 실행을 실시간 점검한다.
 *  - 네이티브 XAH 결제만 수락한다.
 */

int64_t hook(uint32_t reserved)
{
    _g(1, 1);

    trace(SBUF("debug_demo:hook() 시작"), 0, 0, 0);

    uint8_t hook_acc[20];
    hook_account(SBUF(hook_acc));
    trace(SBUF("debug_demo:hook_account (20 bytes): "), SBUF(hook_acc), 1);

    int64_t tt = otxn_type();
    trace_num(SBUF("debug_demo:tx 타입 (0=Payment): "), tt);

    if (tt != 0)
    {
        trace(SBUF("debug_demo:결제가 아님 - 종료"), 0, 0, 0);
        accept(SBUF("debug_demo:ok (no payment)"), __LINE__);
    }

    trace(SBUF("debug_demo:payment 분기 진입"), 0, 0, 0);

    unsigned char amount_buf[48];
    int64_t amount_len = otxn_field(SBUF(amount_buf), sfAmount);
    trace_num(SBUF("debug_demo:Amount 바이트 수: "), amount_len);

    if (amount_len != 8)
    {
        trace(SBUF("debug_demo:Amount가 네이티브 XAH가 아님"), 0, 0, 0);
        rollback(SBUF("debug_demo:네이티브 XAH만 허용"), __LINE__);
    }

    int64_t drops = AMOUNT_TO_DROPS(amount_buf);
    trace_num(SBUF("debug_demo:수신한 drops: "), drops);

    trace(SBUF("debug_demo:결제 수락, 종료"), 0, 0, 0);
    accept(SBUF("debug_demo:ok"), __LINE__);
    return 0;
}`,
            zh: `#include "hookapi.h"

/**
 * Hook: debug_demo.c
 *
 * 目标：
 *  - 演示如何使用 trace()、trace_num() 和 trace_float()
 *    来实时检查 Hook 的执行。
 *  - 只接受原生 XAH 付款。
 */

int64_t hook(uint32_t reserved)
{
    _g(1, 1);

    trace(SBUF("debug_demo:hook() 已启动"), 0, 0, 0);

    uint8_t hook_acc[20];
    hook_account(SBUF(hook_acc));
    trace(SBUF("debug_demo:hook_account (20 bytes): "), SBUF(hook_acc), 1);

    int64_t tt = otxn_type();
    trace_num(SBUF("debug_demo:tx 类型 (0=Payment): "), tt);

    if (tt != 0)
    {
        trace(SBUF("debug_demo:不是付款 - 退出"), 0, 0, 0);
        accept(SBUF("debug_demo:ok (no payment)"), __LINE__);
    }

    trace(SBUF("debug_demo:进入 payment 分支"), 0, 0, 0);

    unsigned char amount_buf[48];
    int64_t amount_len = otxn_field(SBUF(amount_buf), sfAmount);
    trace_num(SBUF("debug_demo:Amount 字节数: "), amount_len);

    if (amount_len != 8)
    {
        trace(SBUF("debug_demo:Amount 不是原生 XAH"), 0, 0, 0);
        rollback(SBUF("debug_demo:仅允许原生 XAH"), __LINE__);
    }

    int64_t drops = AMOUNT_TO_DROPS(amount_buf);
    trace_num(SBUF("debug_demo:收到的 drops: "), drops);

    trace(SBUF("debug_demo:付款已接受，退出"), 0, 0, 0);
    accept(SBUF("debug_demo:ok"), __LINE__);
    return 0;
}`,
          },
        },
      ],
      slides: [
        {
          title: { es: "Las tres funciones trace*", en: "The three trace* functions", jp: "3つのtrace*関数", ko: "세 가지 trace* 함수", zh: "三种 trace* 函数" },
          content: {
            es: "Instrumentar el Hook para ver su ejecución:\n\ntrace(SBUF(\"mensaje\"), 0);\n→ Texto plano en el Debug Stream\n\ntrace(SBUF(buffer), 1);\n→ Contenido del buffer como hex\n\ntrace_num(SBUF(\"label: \"), valor);\n→ Etiqueta + número entero (drops, retornos...)\n\ntrace_float(SBUF(\"label: \"), xfl);\n→ Etiqueta + XFL (coma flotante de Xahau)",
            en: "Instrument the Hook to see its execution:\n\ntrace(SBUF(\"message\"), 0);\n→ Plain text in Debug Stream\n\ntrace(SBUF(buffer), 1);\n→ Buffer content as hex\n\ntrace_num(SBUF(\"label: \"), value);\n→ Label + integer (drops, returns...)\n\ntrace_float(SBUF(\"label: \"), xfl);\n→ Label + XFL (Xahau floating point)",
            jp: "Hookの実行を確認するために計装する：\n\ntrace(SBUF(\"メッセージ\"), 0);\n→ Debug Streamにプレーンテキスト\n\ntrace(SBUF(buffer), 1);\n→ バッファの内容をhexとして\n\ntrace_num(SBUF(\"ラベル: \"), 値);\n→ ラベル + 整数（drops、戻り値...）\n\ntrace_float(SBUF(\"ラベル: \"), xfl);\n→ ラベル + XFL（Xahauの浮動小数点）",
            ko: "Hook 실행을 보기 위한 계측 함수:\n\ntrace(SBUF(\"message\"), 0);\n→ Debug Stream에 일반 텍스트 출력\n\ntrace(SBUF(buffer), 1);\n→ 버퍼를 hex로 출력\n\ntrace_num(SBUF(\"label: \"), value);\n→ 라벨 + 정수값(drops, 반환값 등)\n\ntrace_float(SBUF(\"label: \"), xfl);\n→ 라벨 + XFL 부동소수 표현",
            zh: "用于观察 Hook 执行的追踪函数：\n\ntrace(SBUF(\"message\"), 0);\n→ 在 Debug Stream 输出普通文本\n\ntrace(SBUF(buffer), 1);\n→ 以 hex 输出缓冲区\n\ntrace_num(SBUF(\"label: \"), value);\n→ 输出标签 + 整数值（drops、返回值等）\n\ntrace_float(SBUF(\"label: \"), xfl);\n→ 输出标签 + XFL 浮点表示",
          },
          visual: "🔍",
        },
        {
          title: { es: "Donde ver las trazas", en: "Where to see traces", jp: "トレースを確認する場所", ko: "trace를 확인하는 곳", zh: "在哪里查看 trace" },
          content: {
            es: "Tres formas de leer la salida:\n\n1. Hooks Builder → Debug Stream\n   Selecciona la cuenta en el desplegable\n\n2. Logs del nodo xahaud\n   En modo debug (desarrollo local)\n\n3. WebSocket desde Node.js\n   Suscríbete a la cuenta y lee debug_info\n   + HookExecutions en la metadata de la tx",
            en: "Three ways to read the output:\n\n1. Hooks Builder → Debug Stream\n   Select the account from the dropdown\n\n2. xahaud node logs\n   In debug mode (local development)\n\n3. WebSocket from Node.js\n   Subscribe to the account and read debug_info\n   + HookExecutions in tx metadata",
            jp: "出力を読む3つの方法：\n\n1. Hooks Builder → Debug Stream\n   ドロップダウンからアカウントを選択\n\n2. xahaudノードログ\n   デバッグモード（ローカル開発）\n\n3. Node.jsからのWebSocket\n   アカウントをサブスクライブしてdebug_infoを読む\n   + txメタデータのHookExecutions",
            ko: "출력을 확인하는 세 가지 방법:\n\n1. Hooks Builder → Debug Stream\n   드롭다운에서 계정 선택\n\n2. xahaud 노드 로그\n   로컬 개발의 디버그 모드\n\n3. Node.js WebSocket\n   계정을 구독하고 debug_info 및\n   tx 메타데이터의 HookExecutions 확인",
            zh: "有三种方式查看输出：\n\n1. Hooks Builder → Debug Stream\n   在下拉菜单中选择账户\n\n2. xahaud 节点日志\n   适用于本地开发调试模式\n\n3. Node.js WebSocket\n   订阅账户并检查 debug_info 与\n   交易元数据中的 HookExecutions",
          },
          visual: "📡",
        },
        {
          title: { es: "Trucos clave de debugging", en: "Key debugging tips", jp: "デバッグの重要なヒント", ko: "중요한 디버깅 팁", zh: "关键调试技巧" },
          content: {
            es: "• __LINE__ en accept/rollback → linea exacta de salida\n• Prefijo 'mi_hook:' en cada mensaje\n• trace_num del retorno de CADA funcion critica\n  (negativo = error silencioso)\n• trace con hex=1 para buffers binarios\n• Una traza al inicio de cada rama if/else\n• Instrumenta cbak() para debug de emit()\n• Elimina trazas antes de ir a Mainnet",
            en: "• __LINE__ in accept/rollback → exact exit line\n• Prefix 'my_hook:' in each message\n• trace_num the return of EVERY critical function\n  (negative = silent error)\n• trace with hex=1 for binary buffers\n• One trace at the start of each if/else branch\n• Instrument cbak() to debug emit()\n• Remove traces before going to Mainnet",
            jp: "• __LINE__をaccept/rollbackで使う → 正確な終了行\n• 各メッセージに'my_hook:'プレフィックスを付ける\n• すべての重要な関数の戻り値をtrace_numする\n  （負の値 = サイレントエラー）\n• バイナリバッファにはhex=1でtrace\n• 各if/elseブランチの先頭にトレースを置く\n• emit()デバッグのためにcbak()を計装する\n• Mainnetに移行する前にトレースを削除する",
            ko: "• accept/rollback에 __LINE__ 사용 → 종료 지점 확인\n• 모든 메시지에 'my_hook:' prefix 추가\n• 중요한 함수 반환값은 항상 trace_num\n  (음수 = 숨은 오류)\n• 바이너리 버퍼는 hex=1로 출력\n• 각 if/else 시작점에 trace 추가\n• emit() 디버깅을 위해 cbak()도 계측\n• 메인넷 전에는 trace 정리",
            zh: "• 在 accept/rollback 中使用 __LINE__ → 快速确认退出位置\n• 所有消息都加上 'my_hook:' 前缀\n• 关键函数返回值都用 trace_num 输出\n  （负数通常表示隐藏错误）\n• 二进制缓冲区使用 hex=1 输出\n• 在每个 if/else 起点加 trace\n• 调试 emit() 时也要追踪 cbak()\n• 主网上线前清理 trace",
          },
          visual: "🐛",
        },
      ],
    },
    {
      id: "m8l7",
      title: {
        es: "Hooks Builder: Desarrollo online",
        en: "Hooks Builder: Online development",
        jp: "Hooks Builder：オンライン開発",
        ko: "Hooks Builder: 온라인 개발",
        zh: "Hooks Builder：在线开发",
      },
      theory: {
        es: `[Hooks Builder](https://builder.xahau.network) es el entorno de desarrollo online para Hooks en **Xahau Testnet**. Permite escribir, compilar, desplegar y probar Hooks directamente desde el navegador sin necesidad de instalar nada en tu equipo. **Nota:** Recuerda guardar tus avances y seeds antes de cerrar el navegador, puede que no se guarden una vez cerrada la sesión.

### Pestañas principales

El Builder tiene tres pestañas principales que cubren todo el flujo de desarrollo:

- **Develop**: Escribir y compilar Hooks en C
- **Deploy**: Gestionar cuentas y desplegar Hooks
- **Test**: Generar transacciones de prueba y ver logs

### Paso 1: Gestionar cuentas en Deploy

Antes de desarrollar, necesitas al menos una cuenta de testnet. En la pestaña **Deploy**:

**Crear una cuenta nueva**
1. Haz clic en **"Generate Account"** o el botón de crear cuenta
2. El Builder generará automáticamente un par de claves (dirección + seed) y fondeará la cuenta con XAH de testnet a través del faucet
3. Guarda el seed en un lugar seguro, lo necesitarás si cierras el navegador

**Importar una cuenta existente**
1. Haz clic en **"Import Account"** o el botón de importar
2. Introduce el **seed** (secret) de tu cuenta de testnet
3. La cuenta aparecerá en la lista con su balance y Hooks instalados

Es recomendable tener al menos **dos cuentas**: una para instalar el Hook y otra para enviarle transacciones de prueba. **No utilices seeds de cuentas de Xahau Mainnet en el Builder por seguridad**, si necesitas una nueva seed, genérala dentro del Builder o visita [xahau-test.net](https://xahau-test.net/).

### Paso 2: Desarrollar y compilar en Develop

En la pestaña **Develop**:

1. **Selecciona un ejemplo** del menú lateral o crea un archivo nuevo
2. **Escribe tu Hook en C**, el editor tiene resaltado de sintaxis y autocompletado básico
3. Haz clic en **"Compile To WASM"** para compilar el código C a WebAssembly
4. Si hay errores, aparecerán en la consola inferior, revisa la línea y el mensaje de error
5. Si la compilación es exitosa, recibirás el mensaje \`File xxxx.c compiled successfully. Ready to deploy.Go to deploy\`. El WASM resultante estará listo para desplegarse

**Consejos**:
- Empieza con los ejemplos incluidos para familiarizarte con la API
- Los errores de compilación más comunes son: olvidar incluir \`hookapi.h\`, no declarar el guard \`_g()\`, o errores de tipos en las funciones de la API

### Paso 3: Desplegar en Deploy

Una vez compilado tu Hook, vuelve a la pestaña **Deploy**:

1. **Selecciona la cuenta** donde quieres instalar el Hook y pulsa **Set Hook** para abrir el formulario de instalación
2. **Configura los parámetros**:
   - **Account**: la cuenta donde se instalará el Hook (ya seleccionada)
   - **Sequence**: deja que el Builder lo complete automáticamente
   - **Invoke on transactions** (HookOn): elige los tipos de transacción que activarán el Hook (puedes elegir varias)
   - **Hook Namespace Seed**: el nombre en string que quieres usar como seed para el Namespace.
   - **Hook Namespace (sha256)**: El sha256 generado a partir de la Seed utilizada en el campo anterior (no tocar).
   - **Hook Parameters**: si tu Hook usa parámetros, configúralos aquí (nombre y valor en hex)
   - **Fee**: pulsa en **Suggest** si el Hook da error de fee insuficiente, el Builder calculará el fee recomendado.
3. Haz clic en **"Set Hook"** para enviar la transacción \`SetHook\`
4. Confirma que el resultado es \`tesSUCCESS\` en la consola

### Paso 4: Probar en Test

La pestaña **Test** es donde verificas que tu Hook funciona correctamente:

1. **Transaction type**: Elige el tipo de transacción que quieres enviar (Payment, OfferCreate, etc.).
2. **Account**: El emisor de la transacción.
3. **Sequence**: Deja que el Builder lo complete automáticamente.
4. **Flags**: Configura los flags necesarios para la transacción.
5. **Destination**: La dirección de destino de la transacción.
6. **Amount**: El monto a enviar y el tipo (XAH o IOU), si aplica para la transacción.
7. **Fee**: Pulsa en **Suggest** para que el Builder calcule el fee recomendado.
8. **Hook parameters**: Si tu Hook usa parámetros, configúralos aquí (nombre y valor en hex).
9. **Memos**: Si tu transacción necesita memos, añádelos aquí (opcional).
10. Haz click en **Run Test**.

Deberás estar atento en las pantallas de **Development Log** y **Debug Stream**. En **Debug Stream** puedes elegir que parte del escenario quieres revisar: eligiendo la cuenta si hay varias implicadas.

**Flujo de pruebas recomendado**:

- **Casos positivos**: envía transacciones que deberían ser aceptadas y verifica que pasa.
- **Casos negativos**: envía transacciones que no deberían influir y verifica que es así.
- **Casos límite**: prueba con montos exactos al límite, transacciones de tipos no esperados, etc.
- **Casos no esperados**: prueba transacciones que no esperes por si el Hook las maneja de forma inesperada.
- **Revisa el estado**: si tu Hook usa \`state()\`, verifica que los valores se guardan correctamente consultando \`account_objects\` o la información de estado en el Builder

Una gran y consistente batería de pruebas es clave para asegurar que tu Hook se comporta correctamente en todas las situaciones. Si puedes, pide a otras personas que tambièn prueben tu Hook con casos que tú no hayas considerado.

### Limitaciones del Builder

- Solo funciona con **Xahau Testnet**, no con Mainnet
- Para desarrollo más avanzado o despliegue en producción, necesitarás un entorno local
- El estado de tus cuentas y Hooks se mantiene entre sesiones si no limpias el navegador. No suele ocurrir lo mismo con los Hooks.`,
        en: `[Hooks Builder](https://builder.xahau.network) is the online development environment for Hooks on **Xahau Testnet**. It allows you to write, compile, deploy and test Hooks directly from the browser without needing to install anything on your machine. **Note:** Remember to save your progress and seeds before closing the browser, as they may not be saved once the session is closed.

### Main tabs

The Builder has three main tabs that cover the entire development workflow:

- **Develop**: Write and compile Hooks in C
- **Deploy**: Manage accounts and deploy Hooks
- **Test**: Generate test transactions and view logs

### Step 1: Manage accounts in Deploy

Before developing, you need at least one testnet account. In the **Deploy** tab:

**Create a new account**
1. Click **"Generate Account"** or the create account button
2. The Builder will automatically generate a key pair (address + seed) and fund the account with testnet XAH through the faucet
3. Save the seed in a safe place, you'll need it if you close the browser

**Import an existing account**
1. Click **"Import Account"** or the import button
2. Enter the **seed** (secret) of your testnet account
3. The account will appear in the list with its balance and installed Hooks

It is recommended to have at least **two accounts**: one to install the Hook and another to send test transactions to it. **Do not use seeds from Xahau Mainnet accounts in the Builder for security reasons**, if you need a new seed, generate it within the Builder or visit [xahau-test.net](https://xahau-test.net/).

### Step 2: Develop and compile in Develop

In the **Develop** tab:

1. **Select an example** from the side menu or create a new file
2. **Write your Hook in C**, the editor has syntax highlighting and basic autocomplete
3. Click **"Compile To WASM"** to compile the C code to WebAssembly
4. If there are errors, they will appear in the bottom console, check the line and error message
5. If compilation is successful, you'll receive the message \`File xxxx.c compiled successfully. Ready to deploy.Go to deploy\`. The resulting WASM will be ready to deploy

**Tips**:
- Start with the included examples to familiarize yourself with the API
- The most common compilation errors are: forgetting to include \`hookapi.h\`, not declaring the \`_g()\` guard, or type errors in API functions

### Step 3: Deploy in Deploy

Once your Hook is compiled, go back to the **Deploy** tab:

1. **Select the account** where you want to install the Hook and click **Set Hook** to open the installation form
2. **Configure the parameters**:
   - **Account**: the account where the Hook will be installed (already selected)
   - **Sequence**: let the Builder fill this in automatically
   - **Invoke on transactions** (HookOn): choose the transaction types that will activate the Hook (you can choose multiple)
   - **Hook Namespace Seed**: the string name you want to use as seed for the Namespace.
   - **Hook Namespace (sha256)**: The sha256 generated from the Seed used in the previous field (do not modify).
   - **Hook Parameters**: if your Hook uses parameters, configure them here (name and value in hex)
   - **Fee**: click **Suggest** if the Hook gives a fee insufficient error, the Builder will calculate the recommended fee.
3. Click **"Set Hook"** to send the \`SetHook\` transaction
4. Confirm that the result is \`tesSUCCESS\` in the console

### Step 4: Test in Test

The **Test** tab is where you verify that your Hook works correctly:

1. **Transaction type**: Choose the transaction type you want to send (Payment, OfferCreate, etc.).
2. **Account**: The sender of the transaction.
3. **Sequence**: Let the Builder fill this in automatically.
4. **Flags**: Configure the necessary flags for the transaction.
5. **Destination**: The destination address of the transaction.
6. **Amount**: The amount to send and the type (XAH or IOU), if applicable for the transaction.
7. **Fee**: Click **Suggest** for the Builder to calculate the recommended fee.
8. **Hook parameters**: If your Hook uses parameters, configure them here (name and value in hex).
9. **Memos**: If your transaction needs memos, add them here (optional).
10. Click **Run Test**.

You should watch the **Development Log** and **Debug Stream** screens. In **Debug Stream** you can choose which part of the scenario to review: selecting the account if multiple are involved.

**Recommended test flow**:

- **Positive cases**: send transactions that should be accepted and verify they pass.
- **Negative cases**: send transactions that should not have an effect and verify they don't.
- **Edge cases**: test with amounts exactly at the limit, unexpected transaction types, etc.
- **Unexpected cases**: test transactions you don't expect in case the Hook handles them unexpectedly.
- **Check state**: if your Hook uses \`state()\`, verify that values are saved correctly by querying \`account_objects\` or the state information in the Builder

A large and consistent test suite is key to ensuring your Hook behaves correctly in all situations. If you can, ask other people to also test your Hook with cases you may not have considered.

### Builder limitations

- Only works with **Xahau Testnet**, not with Mainnet
- For more advanced development or production deployment, you'll need a local environment
- Your accounts and Hooks state persists between sessions if you don't clear the browser. The same does not usually apply to Hooks.`,
        jp: `[Hooks Builder](https://builder.xahau.network)は、**Xahau Testnet**上のHooks向けオンライン開発環境です。ブラウザから直接Hooksを記述、コンパイル、デプロイ、テストできます。端末に何もインストールする必要はありません。**注意：** ブラウザを閉じる前に進捗とシードを保存してください。セッションが閉じられると保存されない場合があります。

### メインタブ

BuilderはHooks開発ワークフロー全体をカバーする次の3つのメインタブを持っています。

- **Develop**：C言語でHooksを記述およびコンパイルする
- **Deploy**：アカウントを管理しHooksをデプロイする
- **Test**：テストトランザクションを生成してログを確認する

### ステップ1：Deployでアカウントを管理する

開発を始める前に、少なくとも1つのTestnetアカウントが必要です。**Deploy**タブでは次のことができます。

**新しいアカウントを作成する**
1. **"Generate Account"**またはアカウント作成ボタンをクリックする
2. Builderは自動的にキーペア（アドレス + シード）を生成し、FaucetからTestnet XAHでアカウントに資金を提供する
3. ブラウザを閉じたときに必要になるので、シードを安全な場所に保存する

**既存のアカウントをインポートする**
1. **"Import Account"**またはインポートボタンをクリックする
2. Testnetアカウントの**シード**（secret）を入力する
3. アカウントはその残高とインストールされたHooksとともにリストに表示される

少なくとも**2つのアカウント**を持つことを推奨します：1つはHookのインストール用、もう1つはテストトランザクションの送信用。**セキュリティのためBuilderでXahau Mainnetアカウントのシードを使用しないでください**。新しいシードが必要な場合は、Builder内で生成するか[xahau-test.net](https://xahau-test.net/)を利用してください。

### ステップ2：Developで開発およびコンパイルする

**Develop**タブでは次のことができます。

1. サイドメニューから**例を選択する**か、新しいファイルを作成する
2. **CでHookを記述する**、エディターにはシンタックスハイライトと基本的な自動補完がある
3. **"Compile To WASM"**をクリックしてCコードをWebAssemblyにコンパイルする
4. エラーがある場合は下部のコンソールに表示される。行とエラーメッセージを確認する
5. コンパイルが成功すると\`File xxxx.c compiled successfully. Ready to deploy.Go to deploy\`というメッセージが表示される。生成されたWASMはデプロイ可能な状態になる

**ヒント**：
- APIに慣れるために付属の例から始める
- 最も一般的なコンパイルエラーは：\`hookapi.h\`のinclude忘れ、\`_g()\`ガードの宣言忘れ、またはAPI関数の型エラー

### ステップ3：Deployでデプロイする

HookのコンパイルができたらDeploy**タブに戻ります。

1. Hookをインストールする**アカウントを選択**し、**Set Hook**をクリックしてインストールフォームを開く
2. **パラメーターを設定する**：
   - **Account**：Hookがインストールされるアカウント（すでに選択済み）
   - **Sequence**：Builderが自動的に入力する
   - **Invoke on transactions**（HookOn）：Hookを起動するトランザクションタイプを選択する（複数選択可）
   - **Hook Namespace Seed**：Namespaceのシードとして使用したいstring名
   - **Hook Namespace (sha256)**：前のフィールドのSeedから生成されたsha256（変更しないこと）
   - **Hook Parameters**：HookがParametersを使用する場合、ここで設定する（名前と値はhexで）
   - **Fee**：Hookで手数料不足エラーが出た場合は**Suggest**をクリックし、Builderが推奨手数料を計算する
3. **"Set Hook"**をクリックして\`SetHook\`トランザクションを送信する
4. コンソールで結果が\`tesSUCCESS\`であることを確認する

### ステップ4：Testでテストする

**Test**タブでHookが正しく機能することを確認します。

1. **Transaction type**：送信したいトランザクションタイプを選択する（Payment、OfferCreateなど）。
2. **Account**：トランザクションの送信者。
3. **Sequence**：Builderが自動的に入力する。
4. **Flags**：トランザクションに必要なフラグを設定する。
5. **Destination**：トランザクションの宛先アドレス。
6. **Amount**：トランザクションに該当する場合、送信する金額とタイプ（XAHまたはIOU）。
7. **Fee**：BuilderがSuggestで推奨手数料を計算するためクリックする。
8. **Hook parameters**：HookがParametersを使用する場合、ここで設定する（名前と値はhexで）。
9. **Memos**：トランザクションにメモが必要な場合は追加する（任意）。
10. **Run Test**をクリックする。

**Development Log**と**Debug Stream**の画面を注視する必要があります。**Debug Stream**では、複数のアカウントが関与している場合はアカウントを選択して、シナリオのどの部分を確認するかを選べます。

**推奨テストフロー**：

- **正常ケース**：承認されるべきトランザクションを送信し、通過することを確認する。
- **異常ケース**：影響を与えてはいけないトランザクションを送信し、そうならないことを確認する。
- **境界ケース**：制限ぴったりの金額、予期しないトランザクションタイプなどをテストする。
- **予期しないケース**：Hookが予期しない方法で処理する場合に備えて、予期しないトランザクションをテストする。
- **ステートを確認する**：Hookが\`state()\`を使用する場合、\`account_objects\`またはBuilderのステート情報を照会して値が正しく保存されることを確認する

大規模で一貫したテストスイートは、Hookがすべての状況で正しく動作することを確認するための鍵です。可能であれば、あなたが考慮していないケースでHookをテストするように他の人にも依頼してください。

### Builderの制限事項

- **Xahau Testnet**のみで動作し、Mainnetでは動作しない
- より高度な開発や本番環境へのデプロイには、ローカル環境が必要になる
- ブラウザをクリアしない限り、セッション間でアカウントとHooksの状態は維持される。Hooksの場合は通常そうではない。`,
        ko: `[Hooks Builder](https://builder.xahau.network)는 **Xahau Testnet**용 온라인 Hook 개발 환경입니다. 브라우저만으로 작성, 컴파일, 배포, 테스트까지 빠르게 진행할 수 있습니다.

### 주요 탭

- **Develop**: Hook 코드 작성과 컴파일
- **Deploy**: 계정 관리와 Hook 설치
- **Test**: 테스트 트랜잭션 실행과 로그 확인

### 실습 팁

- 최소 두 개 이상의 테스트 계정을 준비
- 브라우저를 닫기 전에 seed와 진행 상태 저장
- 배포 후에는 Debug Stream과 결과 메타데이터를 함께 확인
- 정상, 실패, 경계, 예외 케이스를 모두 테스트

빠르게 학습하고 실험하기에는 Hooks Builder가 가장 쉬운 진입점이지만, 메인넷 운영이나 자동화에는 한계가 있습니다.`,
        zh: `[Hooks Builder](https://builder.xahau.network) 是面向 **Xahau Testnet** 的在线 Hook 开发环境。只用浏览器就能快速完成编写、编译、部署和测试。

### 主要标签页

- **Develop**：编写与编译 Hook 代码
- **Deploy**：管理账户并安装 Hook
- **Test**：执行测试交易并查看日志

### 实操建议

- 至少准备两个测试账户
- 关闭浏览器前保存好 seed 和当前进度
- 部署后同时查看 Debug Stream 与结果元数据
- 覆盖正常、失败、边界和异常场景

Hooks Builder 是学习和快速实验最容易的入口，但在主网运维或自动化方面仍然有限制。`,
      },
      codeBlocks: [],
      slides: [
        {
          title: { es: "Hooks Builder — Entorno online", en: "Hooks Builder — Online environment", jp: "Hooks Builder — オンライン環境", ko: "Hooks Builder — 온라인 환경", zh: "Hooks Builder — 在线环境" },
          content: {
            es: "builder.xahau.network (solo Testnet)\n\nTres pestanas:\n• Develop: escribir y compilar Hooks en C\n• Deploy: gestionar cuentas y desplegar\n• Test: probar con transacciones reales\n\nGuarda tus seeds antes de cerrar el navegador",
            en: "builder.xahau.network (Testnet only)\n\nThree tabs:\n• Develop: write and compile Hooks in C\n• Deploy: manage accounts and deploy\n• Test: test with real transactions\n\nSave your seeds before closing the browser",
            jp: "builder.xahau.network（Testnetのみ）\n\n3つのタブ：\n• Develop：C言語でHooksを記述およびコンパイル\n• Deploy：アカウントを管理してデプロイ\n• Test：実際のトランザクションでテスト\n\nブラウザを閉じる前にシードを保存する",
            ko: "builder.xahau.network (Testnet 전용)\n\n세 가지 탭:\n• Develop: C로 Hook 작성 및 컴파일\n• Deploy: 계정 관리와 배포\n• Test: 실제 트랜잭션으로 테스트\n\n브라우저를 닫기 전에 seed를 저장",
            zh: "builder.xahau.network（仅限 Testnet）\n\n三个标签页：\n• Develop：用 C 编写并编译 Hook\n• Deploy：管理账户并部署\n• Test：用真实交易测试\n\n关闭浏览器前记得保存 seed",
          },
          visual: "🌐",
        },
        {
          title: { es: "Deploy: cuentas e instalacion", en: "Deploy: accounts and installation", jp: "Deploy：アカウントとインストール", ko: "Deploy: 계정과 설치", zh: "Deploy：账户与安装" },
          content: {
            es: "Cuentas:\n• Generate Account → nueva con faucet\n• Import Account → seed existente de testnet\n• Minimo 2 cuentas (Hook + pruebas)\n\nInstalacion:\n• Seleccionar cuenta + Set Hook\n• Configurar HookOn, Namespace, Parameters\n• Fee → Suggest si hay error de fee",
            en: "Accounts:\n• Generate Account → new with faucet\n• Import Account → existing testnet seed\n• Minimum 2 accounts (Hook + testing)\n\nInstallation:\n• Select account + Set Hook\n• Configure HookOn, Namespace, Parameters\n• Fee → Suggest if fee error",
            jp: "アカウント：\n• Generate Account → フォーセットで新規作成\n• Import Account → 既存のTestnetシード\n• 最低2つのアカウント（Hook + テスト用）\n\nインストール：\n• アカウントを選択 + Set Hook\n• HookOn、Namespace、Parametersを設定\n• Fee → 手数料エラーの場合はSuggest",
            ko: "계정:\n• Generate Account → faucet으로 새 계정 생성\n• Import Account → 기존 testnet seed 가져오기\n• 최소 2개 계정 필요(Hook + 테스트)\n\n설치:\n• 계정 선택 후 Set Hook\n• HookOn, Namespace, Parameters 설정\n• 수수료 오류 시 Suggest 사용",
            zh: "账户：\n• Generate Account → 通过 faucet 创建新账户\n• Import Account → 导入已有 testnet seed\n• 至少需要 2 个账户（Hook + 测试）\n\n安装：\n• 选择账户后点击 Set Hook\n• 配置 HookOn、Namespace、Parameters\n• 如遇费用错误可使用 Suggest",
          },
          visual: "🚀",
        },
        {
          title: { es: "Test: verificar tu Hook", en: "Test: verify your Hook", jp: "Test：HookをVerify", ko: "Test: Hook 검증", zh: "Test：验证你的 Hook" },
          content: {
            es: "• Elegir tipo de tx, cuenta origen, destino\n• Configurar Amount, Flags, Memos\n• Run Test → revisar Development Log\n• Debug Stream: elegir cuenta a monitorear\n\nPruebas recomendadas:\n  Positivos | Negativos | Limites | No esperados",
            en: "• Choose tx type, sender account, destination\n• Configure Amount, Flags, Memos\n• Run Test → check Development Log\n• Debug Stream: choose account to monitor\n\nRecommended tests:\n  Positive | Negative | Edge cases | Unexpected",
            jp: "• txタイプ、送信者アカウント、宛先を選択\n• Amount、Flags、Memosを設定\n• Run Test → Development Logを確認\n• Debug Stream：監視するアカウントを選択\n\n推奨テスト：\n  正常 | 異常 | 境界 | 予期しない",
            ko: "• tx 타입, 발신 계정, 목적지 선택\n• Amount, Flags, Memos 설정\n• Run Test → Development Log 확인\n• Debug Stream에서 모니터링할 계정 선택\n\n권장 테스트:\n  정상 | 실패 | 경계값 | 예외 케이스",
            zh: "• 选择 tx 类型、发送账户和目标地址\n• 配置 Amount、Flags、Memos\n• Run Test → 查看 Development Log\n• 在 Debug Stream 中选择要监控的账户\n\n推荐测试：\n  正常 | 失败 | 边界值 | 异常情况",
          },
          visual: "🧪",
        },
      ],
    },
    {
      id: "m8l8",
      title: {
        es: "Desarrollo local de Hooks con hooks-cli",
        en: "Local Hook development with hooks-cli",
        jp: "hooks-cliによるHooksのローカル開発",
        ko: "hooks-cli를 사용한 로컬 Hook 개발",
        zh: "使用 hooks-cli 进行本地 Hook 开发",
      },
      theory: {
        es: `Para desarrollo profesional, despliegue en **Xahau Mainnet** o proyectos que requieran mayor control, necesitas un entorno de desarrollo local. La herramienta principal es [hooks-cli](https://github.com/Xahau/hooks-cli), una CLI oficial que permite compilar Hooks en C a WebAssembly desde tu terminal.

### ¿Qué es hooks-cli?

**hooks-cli** es una herramienta de línea de comandos que simplifica todo el proceso de compilación de Hooks:

- Compila código C a WebAssembly (.wasm) listo para desplegar
- Incluye todas las dependencias necesarias (compilador, headers, hookapi.h)
- No necesitas configurar manualmente clang, wasm-ld ni las cabeceras del API de Hooks
- Funciona en macOS, Linux y Windows

### Instalación

\`\`\`bash
# Instalar hooks-cli globalmente con npm
npm install -g hooks-cli
\`\`\`

Una vez instalado, el comando \`hooks-cli\` estará disponible en tu terminal.

### Crear carpeta de tu proyecto Hook

\`\`\`bash
# Crear una carpeta para tu proyecto Hook
hooks-cli init c mi-proyecto-hook
\`\`\`

El comando generará una estructura básica de proyecto con un ejemplo de Hook en C, un archivo .env para configuración, y archivos de configuración de TypeScript y npm:

\`\`\`bash
mi-proyecto-hook/
├── contracts/
│   ├── base.c
├── .env
├── package.json
├── tsconfig.json
└── src/
    └── index.ts
\`\`\`

### Instalar dependencias de tu proyecto

\`\`\`bash
# Crear una carpeta para tu proyecto Hook
cd mi-proyecto-hook
yarn install
\`\`\`

Dentro de esta carpeta, puedes organizar tu código fuente, archivos compilados y scripts de despliegue como prefieras. Una estructura común es tener una carpeta \`src/\` para el código C, una carpeta \`build/\` para los archivos .wasm compilados, y una carpeta \`scripts/\` para scripts de despliegue.

### Compilar un Hook

Para compilar un archivo C a WebAssembly (.wasm):

\`\`\`bash
# Compilar un Hook
yarn run build

#Otra opción
# hooks-cli compile-c contracts build/
# El resultado será my_hook.wasm en el /build de tu proyecto
\`\`\`

El archivo \`.wasm\` resultante es el binario que desplegarás en Xahau usando una transacción \`SetHook\`.

### Despliegue del Hook en Xahau

Una vez tengamos nuestro Hook en formato .wasm, necesitamos desplegarlo en Xahau. Para automatizar este proceso, puedes usar la librería \`xahau\` y generar una transacción \`SetHook\` que incluya el código del Hook en formato .wasm:

\`\`\`javascript
const createHook = {
      "TransactionType": "SetHook",
      "Account": mywallet.address,
      "Flags": 0,
      "Hooks": [
        {
          "Hook": {
            "CreateCode": fs.readFileSync('base.wasm').toString('hex').toUpperCase(), //https://bqsoczh.dlvr.cloud/base.wasm
            "HookOn": 'FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFFFFFFFFFFFBFFFFF', //https://richardah.github.io/xrpl-hookon-calculator/
            "HookCanEmit": "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFBFFFFFFFFFFFFFFFFFFFBFFFFF", //Can emit ClaimReward
            "HookNamespace": crypto.createHash('sha256').update('base').digest('hex').toUpperCase(),
            "Flags": 1,
            "HookApiVersion": 0
          }
        }
      ],
    };
\`\`\`


### Referencia y documentación

Para información completa sobre hooks-cli, opciones avanzadas de compilación y la API completa de Hooks, consulta:

- **hooks-cli**: [github.com/Xahau/hooks-cli](https://github.com/Xahau/hooks-cli) — Repositorio oficial con instrucciones de instalación y uso
- **Hooks Toolkit**: [hooks-toolkit.com](https://hooks-toolkit.com/) — Documentación completa del toolkit, incluye guías, referencia de la API de Hooks (\`hookapi.h\`), ejemplos y herramientas adicionales para el desarrollo de Hooks`,
        en: `For professional development, deployment on **Xahau Mainnet** or projects that require greater control, you need a local development environment. The main tool is [hooks-cli](https://github.com/Xahau/hooks-cli), an official CLI that allows compiling Hooks in C to WebAssembly from your terminal.

### What is hooks-cli?

**hooks-cli** is a command-line tool that simplifies the entire Hook compilation process:

- Compiles C code to WebAssembly (.wasm) ready to deploy
- Includes all necessary dependencies (compiler, headers, hookapi.h)
- No need to manually configure clang, wasm-ld or the Hooks API headers
- Works on macOS, Linux and Windows

### Installation

\`\`\`bash
# Install hooks-cli globally with npm
npm install -g hooks-cli
\`\`\`

Once installed, the \`hooks-cli\` command will be available in your terminal.

### Create your Hook project folder

\`\`\`bash
# Create a folder for your Hook project
hooks-cli init c my-hook-project
\`\`\`

The command will generate a basic project structure with a Hook example in C, a .env file for configuration, and TypeScript and npm configuration files:

\`\`\`bash
my-hook-project/
├── contracts/
│   ├── base.c
├── .env
├── package.json
├── tsconfig.json
└── src/
    └── index.ts
\`\`\`

### Install your project dependencies

\`\`\`bash
# Install your project dependencies
cd my-hook-project
yarn install
\`\`\`

Inside this folder, you can organize your source code, compiled files and deployment scripts as you prefer. A common structure is to have a \`src/\` folder for C code, a \`build/\` folder for compiled .wasm files, and a \`scripts/\` folder for deployment scripts.

### Compile a Hook

To compile a C file to WebAssembly (.wasm):

\`\`\`bash
# Compile a Hook
yarn run build

# Another option
# hooks-cli compile-c contracts build/
# The result will be my_hook.wasm in the /build of your project
\`\`\`

The resulting \`.wasm\` file is the binary you'll deploy to Xahau using a \`SetHook\` transaction.

### Deploy the Hook on Xahau

Once we have our Hook in .wasm format, we need to deploy it on Xahau. To automate this process, you can use the \`xahau\` library and generate a \`SetHook\` transaction that includes the Hook code in .wasm format:

\`\`\`javascript
const createHook = {
      "TransactionType": "SetHook",
      "Account": mywallet.address,
      "Flags": 0,
      "Hooks": [
        {
          "Hook": {
            "CreateCode": fs.readFileSync('base.wasm').toString('hex').toUpperCase(), //https://bqsoczh.dlvr.cloud/base.wasm
            "HookOn": 'FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFFFFFFFFFFFBFFFFF', //https://richardah.github.io/xrpl-hookon-calculator/
            "HookCanEmit": "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFBFFFFFFFFFFFFFFFFFFFBFFFFF", //Can emit ClaimReward
            "HookNamespace": crypto.createHash('sha256').update('base').digest('hex').toUpperCase(),
            "Flags": 1,
            "HookApiVersion": 0
          }
        }
      ],
    };
\`\`\`


### Reference and documentation

For complete information on hooks-cli, advanced compilation options and the full Hooks API, see:

- **hooks-cli**: [github.com/Xahau/hooks-cli](https://github.com/Xahau/hooks-cli) — Official repository with installation and usage instructions
- **Hooks Toolkit**: [hooks-toolkit.com](https://hooks-toolkit.com/) — Complete toolkit documentation, includes guides, Hooks API reference (\`hookapi.h\`), examples and additional tools for Hook development`,
        jp: `プロフェッショナルな開発、**Xahau Mainnet**へのデプロイ、またはより大きな制御が必要なプロジェクトには、ローカル開発環境が必要です。主要なツールは[hooks-cli](https://github.com/Xahau/hooks-cli)で、端末からC言語のHooksをWebAssemblyにコンパイルする公式CLIです。

### hooks-cliとは？

**hooks-cli**はHooksのコンパイルプロセス全体を簡素化するコマンドラインツールです。

- CコードをWebAssembly（.wasm）にコンパイルしてデプロイ可能な状態にする
- 必要なすべての依存関係を含む（コンパイラー、ヘッダー、hookapi.h）
- clang、wasm-ld、Hooks APIヘッダーを手動で設定する必要がない
- macOS、Linux、Windowsで動作する

### インストール

\`\`\`bash
# hooks-cliをnpmでグローバルにインストールする
npm install -g hooks-cli
\`\`\`

インストールされると、\`hooks-cli\`コマンドが端末で利用可能になります。

### HookプロジェクトのフォルダーをCreateする

\`\`\`bash
# Hookプロジェクト用のフォルダーを作成する
hooks-cli init c my-hook-project
\`\`\`

このコマンドは、C言語のHookの例、設定用の.envファイル、TypeScriptとnpmの設定ファイルを持つ基本的なプロジェクト構造を生成します：

\`\`\`bash
my-hook-project/
├── contracts/
│   ├── base.c
├── .env
├── package.json
├── tsconfig.json
└── src/
    └── index.ts
\`\`\`

### プロジェクトの依存関係をインストールする

\`\`\`bash
# プロジェクトの依存関係をインストールする
cd my-hook-project
yarn install
\`\`\`

このフォルダー内で、好みに応じてソースコード、コンパイル済みファイル、デプロイスクリプトを整理できます。一般的な構造は、Cコード用に\`src/\`フォルダー、コンパイル済み.wasmファイル用に\`build/\`フォルダー、デプロイスクリプト用に\`scripts/\`フォルダーを持つことです。

### Hookをコンパイルする

CファイルをWebAssembly（.wasm）にコンパイルするには次のようにします。

\`\`\`bash
# Hookをコンパイルする
yarn run build

# 別のオプション
# hooks-cli compile-c contracts build/
# 結果はプロジェクトの/buildにmy_hook.wasmとして作成される
\`\`\`

生成された\`.wasm\`ファイルは、\`SetHook\`トランザクションを使ってXahauにデプロイするバイナリです。

### XahauへのHookのデプロイ

Hookが.wasm形式になったら、Xahauにデプロイする必要があります。このプロセスを自動化するには、\`xahau\`ライブラリを使用して.wasm形式のHookコードを含む\`SetHook\`トランザクションを生成できます。

\`\`\`javascript
const createHook = {
      "TransactionType": "SetHook",
      "Account": mywallet.address,
      "Flags": 0,
      "Hooks": [
        {
          "Hook": {
            "CreateCode": fs.readFileSync('base.wasm').toString('hex').toUpperCase(), // https://bqsoczh.dlvr.cloud/base.wasm
            "HookOn": 'FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFFFFFFFFFFFBFFFFF', // https://richardah.github.io/xrpl-hookon-calculator/
            "HookCanEmit": "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFBFFFFFFFFFFFFFFFFFFFBFFFFF", // ClaimRewardをEmitできる
            "HookNamespace": crypto.createHash('sha256').update('base').digest('hex').toUpperCase(),
            "Flags": 1,
            "HookApiVersion": 0
          }
        }
      ],
    };
\`\`\`


### リファレンスとドキュメント

hooks-cli、高度なコンパイルオプション、完全なHooks APIの詳細については以下を参照してください：

- **hooks-cli**：[github.com/Xahau/hooks-cli](https://github.com/Xahau/hooks-cli) — インストールと使用方法の公式リポジトリ
- **Hooks Toolkit**：[hooks-toolkit.com](https://hooks-toolkit.com/) — 完全なツールキットドキュメント、ガイド、Hooks APIリファレンス（\`hookapi.h\`）、例、Hook開発のための追加ツールを含む`,
        ko: `보다 전문적인 개발이나 **Xahau Mainnet** 배포를 위해서는 로컬 개발 환경이 필요합니다. 핵심 도구는 [hooks-cli](https://github.com/Xahau/hooks-cli) 입니다.

### hooks-cli가 해주는 일

- C 코드를 WebAssembly로 컴파일
- 필요한 컴파일러와 헤더를 함께 제공
- 기본 Hook 프로젝트 구조 생성
- 로컬 반복 개발과 자동화에 적합

### 일반적인 흐름

1. \`npm install -g hooks-cli\`
2. \`hooks-cli init c my-hook-project\`
3. 프로젝트 폴더에서 \`yarn install\`
4. \`yarn run build\` 로 WASM 생성
5. \`xahau.js\` 로 \`SetHook\` 트랜잭션 배포

로컬 환경은 버전 관리, 반복 테스트, 스크립트 자동화, 메인넷 운영 준비에 훨씬 유리합니다.`,
        zh: `如果要做更专业的开发，或者部署到 **Xahau Mainnet**，就需要本地开发环境。核心工具是 [hooks-cli](https://github.com/Xahau/hooks-cli)。

### hooks-cli 能做什么

- 将 C 代码编译为 WebAssembly
- 提供所需的编译器与头文件
- 生成基础 Hook 项目结构
- 适合本地迭代开发与自动化流程

### 常见流程

1. \`npm install -g hooks-cli\`
2. \`hooks-cli init c my-hook-project\`
3. 在项目目录中执行 \`yarn install\`
4. 使用 \`yarn run build\` 生成 WASM
5. 再用 \`xahau.js\` 部署 \`SetHook\` 交易

本地环境在版本管理、反复测试、脚本自动化以及主网准备方面都更有优势。`,
      },
      codeBlocks: [

      ],
      slides: [
        {
          title: { es: "hooks-cli — Desarrollo local", en: "hooks-cli — Local development", jp: "hooks-cli — ローカル開発", ko: "hooks-cli — 로컬 개발", zh: "hooks-cli — 本地开发" },
          content: {
            es: "CLI oficial para compilar Hooks\n\nnpm install -g hooks-cli\nhooks-cli init c mi-proyecto\ncd mi-proyecto && yarn install\nyarn run build\n\nPara desarrollo profesional y Mainnet",
            en: "Official CLI to compile Hooks\n\nnpm install -g hooks-cli\nhooks-cli init c my-project\ncd my-project && yarn install\nyarn run build\n\nFor professional development and Mainnet",
            jp: "HooksをコンパイルするためのCLI\n\nnpm install -g hooks-cli\nhooks-cli init c my-project\ncd my-project && yarn install\nyarn run build\n\nプロフェッショナルな開発とMainnet向け",
            ko: "Hook 컴파일용 공식 CLI\n\nnpm install -g hooks-cli\nhooks-cli init c my-project\ncd my-project && yarn install\nyarn run build\n\n전문 개발과 Mainnet 배포에 적합",
            zh: "用于编译 Hook 的官方 CLI\n\nnpm install -g hooks-cli\nhooks-cli init c my-project\ncd my-project && yarn install\nyarn run build\n\n适合专业开发与 Mainnet 部署",
          },
          visual: "🔨",
        },
        {
          title: { es: "Estructura del proyecto", en: "Project structure", jp: "プロジェクト構造", ko: "프로젝트 구조", zh: "项目结构" },
          content: {
            es: "hooks-cli init c genera:\n\nmi-proyecto-hook/\n├── contracts/base.c\n├── .env\n├── package.json\n├── tsconfig.json\n└── src/index.ts\n\nCompilar: yarn run build\nAlternativa: hooks-cli compile-c contracts build/",
            en: "hooks-cli init c generates:\n\nmy-hook-project/\n├── contracts/base.c\n├── .env\n├── package.json\n├── tsconfig.json\n└── src/index.ts\n\nCompile: yarn run build\nAlternative: hooks-cli compile-c contracts build/",
            jp: "hooks-cli init c が生成するもの：\n\nmy-hook-project/\n├── contracts/base.c\n├── .env\n├── package.json\n├── tsconfig.json\n└── src/index.ts\n\nコンパイル: yarn run build\n代替: hooks-cli compile-c contracts build/",
            ko: "hooks-cli init c 로 생성되는 구조:\n\nmy-hook-project/\n├── contracts/base.c\n├── .env\n├── package.json\n├── tsconfig.json\n└── src/index.ts\n\n컴파일: yarn run build\n대안: hooks-cli compile-c contracts build/",
            zh: "hooks-cli init c 会生成如下结构：\n\nmy-hook-project/\n├── contracts/base.c\n├── .env\n├── package.json\n├── tsconfig.json\n└── src/index.ts\n\n编译：yarn run build\n替代方式：hooks-cli compile-c contracts build/",
          },
          visual: "📁",
        },
        {
          title: { es: "Despliegue y referencia", en: "Deployment and reference", jp: "デプロイとリファレンス", ko: "배포와 참고자료", zh: "部署与参考资料" },
          content: {
            es: "SetHook con xahau.js:\n• Leer .wasm → hex → CreateCode\n• Configurar HookOn, HookCanEmit, Namespace\n• crypto.createHash('sha256') para namespace\n\nReferencia:\n• github.com/Xahau/hooks-cli\n• hooks-toolkit.com",
            en: "SetHook with xahau.js:\n• Read .wasm → hex → CreateCode\n• Configure HookOn, HookCanEmit, Namespace\n• crypto.createHash('sha256') for namespace\n\nReference:\n• github.com/Xahau/hooks-cli\n• hooks-toolkit.com",
            jp: "xahau.jsでSetHook：\n• .wasmを読み込む → hex → CreateCode\n• HookOn、HookCanEmit、Namespaceを設定\n• Namespace用にcrypto.createHash('sha256')\n\nリファレンス：\n• github.com/Xahau/hooks-cli\n• hooks-toolkit.com",
            ko: "xahau.js로 SetHook 배포:\n• .wasm 읽기 → hex → CreateCode\n• HookOn, HookCanEmit, Namespace 설정\n• namespace용 crypto.createHash('sha256') 사용\n\n참고:\n• github.com/Xahau/hooks-cli\n• hooks-toolkit.com",
            zh: "使用 xahau.js 部署 SetHook：\n• 读取 .wasm → 转 hex → CreateCode\n• 配置 HookOn、HookCanEmit、Namespace\n• 对 namespace 使用 crypto.createHash('sha256')\n\n参考：\n• github.com/Xahau/hooks-cli\n• hooks-toolkit.com",
          },
          visual: "📚",
        },
      ],
    },
  ],
}
