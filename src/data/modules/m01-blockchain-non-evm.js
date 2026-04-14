export default {
  id: "m1",
  icon: "🧱",
  title: {
    es: "Arquitectura básica de una blockchain No-EVM",
    en: "Basic Architecture of a Non-EVM Blockchain",
    jp: "Non-EVMブロックチェーンの基本アーキテクチャ",
    ko: "비 EVM 블록체인의 기본 구조",
  },
  lessons: [
    {
      id: "m1l0",
      title: {
        es: "¿Qué es una blockchain?",
        en: "What is a Blockchain?",
        jp: "ブロックチェーンとは？",
        ko: "블록체인이란 무엇인가?",
      },
      theory: {
        es: `Antes de hablar de blockchains No-EVM, necesitamos entender **qué es una blockchain** y por qué esta tecnología es revolucionaria.

### Definición simple

Una **blockchain** (cadena de bloques) es un **libro de registros digital, distribuido e inmutable**. Imagina un cuaderno contable que:
- Está **copiado en miles de ordenadores** por todo el mundo (distribuido)
- **Nadie puede borrar ni alterar** lo que ya se ha escrito (inmutable)
- **Cualquiera puede verificar** que los datos son correctos (transparente)
- **No necesita un intermediario** como un banco o una empresa (descentralizado)

### ¿Cómo funciona?

Los datos se agrupan en **bloques**. Cada bloque contiene:
1. Un conjunto de **transacciones** (por ejemplo: "Alice envía 10 tokens a Bob")
2. Un **hash** (huella digital única) del bloque
3. El **hash del bloque anterior**, creando así una cadena

Esta estructura hace que modificar un bloque antiguo sea prácticamente imposible, porque cambiaría su hash y rompería toda la cadena posterior.

### Conceptos clave

**Descentralización**
No hay un servidor central. La red está formada por **nodos** (ordenadores) que mantienen una copia del libro de registros. No hay un punto único de fallo.

**Inmutabilidad**
Una vez que una transacción se incluye en un bloque y se valida, **no se puede modificar ni eliminar**. Esto garantiza un historial fiable.

**Consenso**
Los nodos necesitan un mecanismo para ponerse de acuerdo sobre qué transacciones son válidas. Esto se llama **protocolo de consenso** (lo veremos en detalle en el módulo 2).

**Criptografía**
La blockchain usa funciones criptográficas para:
- **Hashes**: Identificar bloques y verificar integridad de datos
- **Firmas digitales**: Demostrar que una transacción fue autorizada por el propietario
- **Claves público/privada**: Cada usuario tiene un par de claves que actúa como su identidad

**Transacciones**
Son las operaciones que modifican el estado de la blockchain: enviar tokens, crear un contrato, registrar un dato, etc. Cada transacción está **firmada digitalmente** por su emisor.

### Blockchain vs Base de datos tradicional

| Característica | Base de datos tradicional | Blockchain |
|---|---|---|
| Control | Una empresa (centralizada) | Red de nodos (descentralizada) |
| Modificación | Cualquiera con acceso puede editar | Inmutable una vez validado |
| Confianza | Confías en la empresa | Confías en la criptografía y el consenso |
| Transparencia | Privada por defecto | Pública y verificable |
| Intermediario | Necesario (banco, servidor) | No necesario (peer-to-peer) |

### ¿Para qué sirve?

Las blockchains se usan para:
- **Criptomonedas**: Enviar dinero sin bancos (Bitcoin, XAH)
- **Tokens**: Crear activos digitales propios
- **NFTs**: Certificar la propiedad de objetos digitales únicos
- **Smart contracts**: Ejecutar lógica programable de forma automática y confiable
- **Trazabilidad**: Registrar cadenas de suministro, certificados, votaciones, etc.

### Tipos de blockchain

- **Públicas**: Cualquiera puede participar (Bitcoin, Ethereum, Xahau)
- **Privadas/Permisionadas**: Solo miembros autorizados participan (Hyperledger)
- **Híbridas**: Combinan elementos de ambas

En este curso nos centraremos en **Xahau**, una blockchain **pública** diseñada para pagos rápidos, tokens y smart contracts eficientes.`,
        en: `Before talking about Non-EVM blockchains, we need to understand **what a blockchain is** and why this technology is revolutionary.

### Simple Definition

A **blockchain** is a **digital, distributed, and immutable ledger**. Imagine an accounting book that:
- Is **copied across thousands of computers** around the world (distributed)
- **Nobody can erase or alter** what has already been written (immutable)
- **Anyone can verify** that the data is correct (transparent)
- **Does not need an intermediary** like a bank or a company (decentralized)

### How Does It Work?

Data is grouped into **blocks**. Each block contains:
1. A set of **transactions** (for example: "Alice sends 10 tokens to Bob")
2. A **hash** (unique digital fingerprint) of the block
3. The **hash of the previous block**, thus creating a chain

This structure makes modifying an old block practically impossible, because it would change its hash and break the entire subsequent chain.

### Key Concepts

**Decentralization**
There is no central server. The network is made up of **nodes** (computers) that maintain a copy of the ledger. There is no single point of failure.

**Immutability**
Once a transaction is included in a block and validated, **it cannot be modified or deleted**. This guarantees a reliable history.

**Consensus**
Nodes need a mechanism to agree on which transactions are valid. This is called a **consensus protocol** (we will cover this in detail in module 2).

**Cryptography**
The blockchain uses cryptographic functions for:
- **Hashes**: Identifying blocks and verifying data integrity
- **Digital signatures**: Proving that a transaction was authorized by its owner
- **Public/private keys**: Each user has a key pair that acts as their identity

**Transactions**
These are the operations that modify the state of the blockchain: sending tokens, creating a contract, registering data, etc. Each transaction is **digitally signed** by its sender.

### Blockchain vs Traditional Database

| Feature | Traditional Database | Blockchain |
|---|---|---|
| Control | A company (centralized) | Network of nodes (decentralized) |
| Modification | Anyone with access can edit | Immutable once validated |
| Trust | You trust the company | You trust cryptography and consensus |
| Transparency | Private by default | Public and verifiable |
| Intermediary | Required (bank, server) | Not required (peer-to-peer) |

### What Is It Used For?

Blockchains are used for:
- **Cryptocurrencies**: Sending money without banks (Bitcoin, XAH)
- **Tokens**: Creating your own digital assets
- **NFTs**: Certifying ownership of unique digital objects
- **Smart contracts**: Executing programmable logic automatically and reliably
- **Traceability**: Recording supply chains, certificates, votes, etc.

### Types of Blockchain

- **Public**: Anyone can participate (Bitcoin, Ethereum, Xahau)
- **Private/Permissioned**: Only authorized members participate (Hyperledger)
- **Hybrid**: Combine elements of both

In this course we will focus on **Xahau**, a **public** blockchain designed for fast payments, tokens, and efficient smart contracts.`,
        jp: `Non-EVMブロックチェーンの話をする前に、**ブロックチェーンとは何か**、そしてなぜこの技術が革命的なのかを理解する必要があります。

### シンプルな定義

**ブロックチェーン**（ブロックの連鎖）とは、**デジタルで分散された不変の台帳**です。次のような帳簿をイメージしてください：
- 世界中の**何千ものコンピュータにコピー**されている（分散型）
- すでに書かれた内容を**誰も消したり変更したりできない**（不変性）
- データが正しいことを**誰でも検証できる**（透明性）
- 銀行や企業のような**仲介者が不要**（分散化）

### どのように機能するのか？

データは**ブロック**にまとめられます。各ブロックには以下が含まれます：
1. **トランザクション**のセット: 例：「アリスがボブに10トークンを送る」
2. ブロックの**ハッシュ**: ユニークなデジタル指紋
3. **前のブロックのハッシュ**: これによってチェーンが形成されます

この構造により、古いブロックを改ざんすることは事実上不可能です。変更するとそのハッシュが変わり、その後のチェーン全体が壊れてしまうからです。

### 主要概念

**分散化**
中央サーバーは存在しません。ネットワークは台帳のコピーを保持する**ノード**（コンピュータ）で構成されています。単一障害点はありません。

**不変性**
トランザクションがブロックに含まれ検証されると、**変更も削除もできません**。これにより信頼できる履歴が保証されます。

**コンセンサス**
ノードはどのトランザクションが有効かについて合意するメカニズムを必要とします。これを**コンセンサスプロトコル**と呼びます（モジュール2で詳しく説明します）。

**暗号技術**
ブロックチェーンは以下のために暗号関数を使用します：
- **ハッシュ**：ブロックの識別とデータの整合性検証
- **デジタル署名**：トランザクションが所有者によって承認されたことの証明
- **公開鍵/秘密鍵**：各ユーザーはアイデンティティとして機能する鍵ペアを持つ

**トランザクション**
トークンの送信、コントラクトの作成、データの記録などブロックチェーンの状態を変更する操作です。各トランザクションは送信者によって**デジタル署名**されています。

### ブロックチェーン vs 従来のデータベース

| 特徴 | 従来のデータベース | ブロックチェーン |
|---|---|---|
| 管理 | 企業（中央集権） | ノードのネットワーク（分散型） |
| 変更 | アクセス権を持つ誰でも編集可能 | 検証後は不変 |
| 信頼 | 企業を信頼する | 暗号技術とコンセンサスを信頼する |
| 透明性 | デフォルトで非公開 | 公開かつ検証可能 |
| 仲介者 | 必要（銀行、サーバー） | 不要（ピアツーピア） |

### 何に使われるのか？

ブロックチェーンは次のような用途に使用されます。
- **暗号通貨**：銀行なしでお金を送る（Bitcoin、XAH）
- **トークン**：独自のデジタル資産を作成する
- **NFT**：ユニークなデジタルオブジェクトの所有権を証明する
- **スマートコントラクト**：プログラマブルなロジックを自動かつ信頼性高く実行する
- **トレーサビリティ**：サプライチェーン、証明書、投票などの記録

### ブロックチェーンの種類

- **パブリック**：誰でも参加できる（Bitcoin、Ethereum、Xahau）
- **プライベート/許可型**：承認されたメンバーのみが参加する（Hyperledger）
- **ハイブリッド**：両方の要素を組み合わせる

このコースでは**Xahau**に焦点を当てます。Xahauは高速な支払い、トークン、効率的なスマートコントラクトのために設計された**パブリック**ブロックチェーンです。`,
        ko: `비 EVM 블록체인을 이야기하기 전에, 먼저 **블록체인이 무엇인지** 그리고 왜 이 기술이 혁신적인지 이해해야 합니다.

### 간단한 정의

**블록체인**은 **디지털이고, 분산되어 있으며, 변경하기 어려운 원장**입니다. 다음과 같은 회계 장부를 떠올려 보세요:
- 전 세계 **수천 대의 컴퓨터에 복사**되어 있음
- 이미 기록된 내용을 **누구도 지우거나 바꾸기 어려움**
- **누구나 데이터의 정확성을 검증**할 수 있음
- 은행이나 회사 같은 **중개자가 필요 없음**

### 어떻게 동작할까?

데이터는 **블록**으로 묶입니다. 각 블록에는 다음이 들어 있습니다:
1. **트랜잭션** 집합
2. 블록의 **해시**
3. **이전 블록의 해시**

이 구조 덕분에 과거 블록을 수정하면 이후 체인이 모두 깨지므로 위변조가 매우 어렵습니다.

### 핵심 개념

**탈중앙화**
네트워크는 원장 복사본을 유지하는 **노드**들로 구성됩니다. 단일 장애 지점이 없습니다.

**불변성**
트랜잭션이 포함되고 검증되면 **수정하거나 삭제할 수 없습니다**.

**합의**
노드들은 어떤 트랜잭션이 유효한지 서로 동의해야 하며, 이를 **합의 프로토콜**이라고 합니다.

**암호학**
블록체인은 다음 용도로 암호 기술을 사용합니다:
- **해시**: 블록 식별과 데이터 무결성 검증
- **디지털 서명**: 트랜잭션이 실제 소유자에 의해 승인되었음을 증명
- **공개키/개인키**: 사용자의 네트워크 신원

**트랜잭션**
토큰 전송, 데이터 기록, 계약 실행 같은 상태 변경 작업입니다. 각 트랜잭션은 **디지털 서명**으로 보호됩니다.

### 전통적 데이터베이스와의 차이

| 특징 | 전통적 데이터베이스 | 블록체인 |
|---|---|---|
| 통제 | 한 회사가 관리 | 노드 네트워크가 관리 |
| 수정 | 권한이 있으면 수정 가능 | 검증 후 변경 어려움 |
| 신뢰 | 운영 주체를 신뢰 | 암호학과 합의를 신뢰 |
| 투명성 | 기본적으로 비공개 | 공개적이고 검증 가능 |
| 중개자 | 필요 | 불필요 |

### 어디에 쓰일까?

- **암호화폐**: 은행 없이 돈 전송
- **토큰**: 디지털 자산 발행
- **NFT**: 고유한 디지털 자산의 소유권 증명
- **스마트 컨트랙트**: 자동 실행되는 프로그래밍 로직
- **추적성**: 공급망, 인증서, 투표 등의 기록

### 블록체인의 유형

- **퍼블릭 블록체인**: 누구나 참여 가능
- **프라이빗/허가형 블록체인**: 승인된 참여자만 사용
- **하이브리드 블록체인**: 두 특성을 혼합

이 강좌에서는 빠른 결제, 토큰, 효율적인 스마트 컨트랙트를 위해 설계된 **퍼블릭 블록체인 Xahau**를 중심으로 배웁니다.`,
      },
      codeBlocks: [],
      slides: [
        {
          title: { es: "¿Qué es una blockchain?", en: "What is a Blockchain?", jp: "ブロックチェーンとは？", ko: "블록체인이란 무엇인가?" },
          content: {
            es: "Un libro de registros digital:\n\n• Distribuido → Copiado en miles de nodos\n• Inmutable → No se puede alterar\n• Transparente → Cualquiera puede verificar\n• Descentralizado → Sin intermediarios",
            en: "A digital ledger:\n\n• Distributed → Copied across thousands of nodes\n• Immutable → Cannot be altered\n• Transparent → Anyone can verify\n• Decentralized → No intermediaries",
            jp: "デジタル台帳：\n\n• 分散型 → 何千ものノードにコピー\n• 不変性 → 改ざん不可能\n• 透明性 → 誰でも検証可能\n• 分散化 → 仲介者不要",
            ko: "디지털 원장:\n\n• 분산형 → 수천 개 노드에 복사됨\n• 불변성 → 쉽게 변경 불가\n• 투명성 → 누구나 검증 가능\n• 탈중앙화 → 중개자 없음",
          },
          visual: "📒",
        },
        {
          title: { es: "Cadena de bloques", en: "Chain of Blocks", jp: "ブロックの連鎖", ko: "블록의 연결" },
          content: {
            es: "Bloque 1 → Bloque 2 → Bloque 3 → ...\n\nCada bloque contiene:\n• Transacciones\n• Hash propio (huella digital)\n• Hash del bloque anterior\n\nCambiar un bloque rompe toda la cadena",
            en: "Block 1 → Block 2 → Block 3 → ...\n\nEach block contains:\n• Transactions\n• Its own hash (digital fingerprint)\n• Hash of the previous block\n\nChanging a block breaks the entire chain",
            jp: "ブロック1 → ブロック2 → ブロック3 → ...\n\n各ブロックには：\n• トランザクション\n• 固有のハッシュ（デジタル指紋）\n• 前のブロックのハッシュ\n\nブロックを変更するとチェーン全体が壊れる",
            ko: "블록 1 → 블록 2 → 블록 3 → ...\n\n각 블록에는 다음이 포함됩니다:\n• 트랜잭션\n• 자신의 해시 (디지털 지문)\n• 이전 블록의 해시\n\n하나를 바꾸면 전체 체인이 깨집니다",
          },
          visual: "🔗",
        },
        {
          title: { es: "Conceptos clave", en: "Key Concepts", jp: "主要概念", ko: "핵심 개념" },
          content: {
            es: "🔐 Criptografía → Hashes y firmas digitales\n🤝 Consenso → Nodos se ponen de acuerdo\n🔑 Claves → Tu identidad en la red\n📝 Transacciones → Operaciones firmadas",
            en: "🔐 Cryptography → Hashes and digital signatures\n🤝 Consensus → Nodes agree with each other\n🔑 Keys → Your identity on the network\n📝 Transactions → Signed operations",
            jp: "🔐 暗号技術 → ハッシュとデジタル署名\n🤝 コンセンサス → ノードが合意する\n🔑 鍵 → ネットワーク上のアイデンティティ\n📝 トランザクション → 署名された操作",
            ko: "🔐 암호학 → 해시와 디지털 서명\n🤝 합의 → 노드 간 동의\n🔑 키 → 네트워크에서의 신원\n📝 트랜잭션 → 서명된 작업",
          },
          visual: "🧩",
        },
        {
          title: { es: "¿Para qué sirve?", en: "What Is It Used For?", jp: "何に使われるのか？", ko: "어디에 사용될까?" },
          content: {
            es: "• 💰 Criptomonedas (pagos sin bancos)\n• 🪙 Tokens (activos digitales)\n• 🎨 NFTs (objetos únicos)\n• 🪝 Smart contracts (lógica programable)\n• 📦 Trazabilidad (registros verificables)",
            en: "• 💰 Cryptocurrencies (payments without banks)\n• 🪙 Tokens (digital assets)\n• 🎨 NFTs (unique objects)\n• 🪝 Smart contracts (programmable logic)\n• 📦 Traceability (verifiable records)",
            jp: "• 💰 暗号通貨（銀行なしの支払い）\n• 🪙 トークン（デジタル資産）\n• 🎨 NFT（ユニークなオブジェクト）\n• 🪝 スマートコントラクト（プログラマブルなロジック）\n• 📦 トレーサビリティ（検証可能な記録）",
            ko: "• 💰 암호화폐 (은행 없는 결제)\n• 🪙 토큰 (디지털 자산)\n• 🎨 NFT (고유 자산)\n• 🪝 스마트 컨트랙트 (프로그래밍 가능한 로직)\n• 📦 추적성 (검증 가능한 기록)",
          },
          visual: "🌐",
        },
      ],
    },
    {
      id: "m1l1",
      title: {
        es: "¿Qué es una blockchain No-EVM?",
        en: "What is a Non-EVM Blockchain?",
        jp: "Non-EVMブロックチェーンとは？",
        ko: "비 EVM 블록체인이란 무엇인가?",
      },
      theory: {
        es: `Cuando hablamos de blockchains, la mayoría de desarrolladores piensan en **Ethereum** y su máquina virtual (**EVM**). Sin embargo, existen blockchains que funcionan de manera completamente diferente, sin usar la EVM ni Solidity.

### EVM vs No-EVM

| Característica | Blockchain EVM | Blockchain No-EVM (Xahau) |
|---|---|---|
| Lenguaje de contratos | Solidity / Vyper | C (compilado a WebAssembly) |
| Máquina virtual | EVM (Ethereum Virtual Machine) | No usa VM, ejecución nativa WASM |
| Modelo de estado | Cuentas con storage arbitrario | Objetos del ledger tipados |
| Gas / Fees | Gas variable y costoso | Fees fijos y predecibles |
| Modelo de datos | Key-value en storage | Objetos nativos (AccountRoot, TrustLine, etc.) |

### ¿Por qué No-EVM?

Las blockchains No-EVM como **Xahau** fueron diseñadas desde cero para casos de uso específicos: pagos rápidos, tokenización y lógica programable eficiente. No intentan ser "computadoras de propósito general" como Ethereum, sino que optimizan para **rendimiento, bajo coste y finalidad rápida**.

### Xahau: una blockchain No-EVM

**Xahau** es una blockchain de capa 1 que hereda la arquitectura del **XRP Ledger (XRPL)** y le añade la capacidad de ejecutar **Hooks**, smart contracts ligeros escritos en C y compilados a WebAssembly.

A diferencia de las redes EVM, en Xahau:
- Las transacciones son **nativas y tipadas** (Payment, TrustSet, OfferCreate, etc.)
- El ledger mantiene **objetos estructurados**, no estados arbitrarios
- Los smart contracts (Hooks) se ejecutan como **filtros reactivos** sobre las transacciones
- El token nativo es **XAH**`,
        en: `When we talk about blockchains, most developers think of **Ethereum** and its virtual machine (**EVM**). However, there are blockchains that work in a completely different way, without using the EVM or Solidity.

### EVM vs Non-EVM

| Feature | EVM Blockchain | Non-EVM Blockchain (Xahau) |
|---|---|---|
| Contract language | Solidity / Vyper | C (compiled to WebAssembly) |
| Virtual machine | EVM (Ethereum Virtual Machine) | No VM, native WASM execution |
| State model | Accounts with arbitrary storage | Typed ledger objects |
| Gas / Fees | Variable and expensive gas | Fixed and predictable fees |
| Data model | Key-value in storage | Native objects (AccountRoot, TrustLine, etc.) |

### Why Non-EVM?

Non-EVM blockchains like **Xahau** were designed from scratch for specific use cases: fast payments, tokenization, and efficient programmable logic. They do not try to be "general-purpose computers" like Ethereum, but instead optimize for **performance, low cost, and fast finality**.

### Xahau: a Non-EVM Blockchain

**Xahau** is a layer 1 blockchain that inherits the architecture of the **XRP Ledger (XRPL)** and adds the ability to execute **Hooks**, lightweight smart contracts written in C and compiled to WebAssembly.

Unlike EVM networks, in Xahau:
- Transactions are **native and typed** (Payment, TrustSet, OfferCreate, etc.)
- The ledger maintains **structured objects**, not arbitrary states
- Smart contracts (Hooks) execute as **reactive filters** on transactions
- The native token is **XAH**`,
        jp: `ブロックチェーンと言えば、ほとんどの開発者は**Ethereum**とその仮想マシン（**EVM**）を思い浮かべます。しかし、EVMやSolidityを使わず、まったく異なる方法で機能するブロックチェーンも存在します。

### EVM vs Non-EVM

| 特徴 | EVMブロックチェーン | Non-EVMブロックチェーン（Xahau） |
|---|---|---|
| コントラクト言語 | Solidity / Vyper | C（WebAssemblyにコンパイル） |
| 仮想マシン | EVM（Ethereum Virtual Machine） | VMなし、ネイティブWASM実行 |
| 状態モデル | 任意ストレージを持つアカウント | 型付きレジャーオブジェクト |
| ガス/手数料 | 変動的で高価なガス | 固定で予測可能な手数料 |
| データモデル | ストレージのキーバリュー | ネイティブオブジェクト（AccountRoot、TrustLineなど） |

### なぜNon-EVMなのか？

**Xahau**のようなNon-EVMブロックチェーンは、高速な支払い、トークン化、効率的なプログラマブルロジックなど特定のユースケースのためにゼロから設計されました。Ethereumのような「汎用コンピュータ」を目指すのではなく、**パフォーマンス、低コスト、高速な最終性**に最適化しています。

### Xahau：Non-EVMブロックチェーン

**Xahau**は**XRP Ledger（XRPL）**のアーキテクチャを継承し、**Hooks**（Cで書かれWebAssemblyにコンパイルされた軽量スマートコントラクト）を実行する能力を追加したレイヤー1ブロックチェーンです。

EVMネットワークとは異なり、Xahauでは次の特徴があります。
- トランザクションは**ネイティブかつ型付き**（Payment、TrustSet、OfferCreateなど）
- レジャーは**構造化されたオブジェクト**を維持し、任意の状態ではない
- スマートコントラクト（Hooks）はトランザクションに対する**リアクティブフィルタ**として実行される
- ネイティブトークンは**XAH**`,
        ko: `블록체인을 이야기할 때 많은 개발자는 **Ethereum**과 그 가상 머신인 **EVM**을 먼저 떠올립니다. 하지만 EVM이나 Solidity를 사용하지 않고 전혀 다른 방식으로 동작하는 체인도 있습니다.

### EVM vs 비 EVM

| 특징 | EVM 블록체인 | 비 EVM 블록체인 (Xahau) |
|---|---|---|
| 컨트랙트 언어 | Solidity / Vyper | C (WebAssembly로 컴파일) |
| 가상 머신 | EVM | 별도 VM 없이 WASM 실행 |
| 상태 모델 | 임의 storage를 가진 계정 | 타입이 있는 레저 객체 |
| 가스 / 수수료 | 가변적이고 비쌈 | 고정적이고 예측 가능 |
| 데이터 모델 | key-value storage | 네이티브 객체 중심 |

### 왜 비 EVM일까?

Xahau 같은 비 EVM 체인은 빠른 결제, 토큰화, 효율적인 프로그래밍 로직처럼 특정 사용 사례를 위해 설계되었습니다. Ethereum처럼 범용 컴퓨터를 목표로 하기보다 **성능, 저비용, 빠른 최종성**에 최적화되어 있습니다.

### Xahau: 비 EVM 블록체인

**Xahau**는 **XRP Ledger (XRPL)**의 구조를 계승하면서, C로 작성해 WebAssembly로 컴파일하는 가벼운 스마트 컨트랙트인 **Hooks**를 추가한 레이어 1 블록체인입니다.

EVM 계열과 달리 Xahau에서는:
- 트랜잭션이 **네이티브이며 타입이 명확함**
- 레저가 **구조화된 객체**를 유지함
- Hooks가 트랜잭션 위에서 **반응형 필터**처럼 실행됨
- 네이티브 토큰은 **XAH**임`,
      },
      codeBlocks: [
        {
          title: {
            es: "Conectar a un nodo Xahau y ver info del servidor",
            en: "Connect to a Xahau node and view server info",
            jp: "Xahauノードに接続してサーバー情報を表示する",
            ko: "Xahau 노드에 연결하고 서버 정보 보기",
          },
          language: "javascript",
          code: {
            es: `const { Client } = require("xahau");

async function serverInfo() {
  const client = new Client("wss://xahau.network");
  await client.connect();

  const response = await client.request({
    command: "server_info"
  });

  const info = response.result.info;
  console.log("Red:", info.network_id);
  console.log("Versión:", info.build_version);
  console.log("Ledger actual:", info.validated_ledger.seq);
  console.log("Tipo de red: No-EVM (blockchain Xahau)");

  await client.disconnect();
}

serverInfo();`,
            en: `const { Client } = require("xahau");

async function serverInfo() {
  const client = new Client("wss://xahau.network");
  await client.connect();

  const response = await client.request({
    command: "server_info"
  });

  const info = response.result.info;
  console.log("Network:", info.network_id);
  console.log("Version:", info.build_version);
  console.log("Current ledger:", info.validated_ledger.seq);
  console.log("Network type: Non-EVM (Xahau blockchain)");

  await client.disconnect();
}

serverInfo();`,
            jp: `const { Client } = require("xahau");

async function serverInfo() {
  const client = new Client("wss://xahau.network");
  await client.connect();

  const response = await client.request({
    command: "server_info"
  });

  const info = response.result.info;
  console.log("ネットワーク:", info.network_id);
  console.log("バージョン:", info.build_version);
  console.log("現在のレジャー:", info.validated_ledger.seq);
  console.log("ネットワーク種別: Non-EVM（Xahauブロックチェーン）");

  await client.disconnect();
}

serverInfo();`,
            ko: `const { Client } = require("xahau");

async function serverInfo() {
  const client = new Client("wss://xahau.network");
  await client.connect();

  const response = await client.request({
    command: "server_info"
  });

  const info = response.result.info;
  console.log("네트워크:", info.network_id);
  console.log("버전:", info.build_version);
  console.log("현재 레저:", info.validated_ledger.seq);
  console.log("네트워크 유형: 비 EVM (Xahau 블록체인)");

  await client.disconnect();
}

serverInfo();`,
          },
        },
      ],
      slides: [
        {
          title: { es: "EVM vs No-EVM", en: "EVM vs Non-EVM", jp: "EVM vs Non-EVM", ko: "EVM vs 비 EVM" },
          content: {
            es: "EVM (Ethereum)\n• Solidity → Bytecode EVM\n• Gas variable\n• Estado arbitrario\n\nNo-EVM (Xahau)\n• C → WebAssembly\n• Fees fijos\n• Objetos tipados del ledger",
            en: "EVM (Ethereum)\n• Solidity → EVM Bytecode\n• Variable gas\n• Arbitrary state\n\nNon-EVM (Xahau)\n• C → WebAssembly\n• Fixed fees\n• Typed ledger objects",
            jp: "EVM（Ethereum）\n• Solidity → EVMバイトコード\n• 変動ガス\n• 任意の状態\n\nNon-EVM（Xahau）\n• C → WebAssembly\n• 固定手数料\n• 型付きレジャーオブジェクト",
            ko: "EVM (Ethereum)\n• Solidity → EVM 바이트코드\n• 가변 가스\n• 임의 상태 저장\n\n비 EVM (Xahau)\n• C → WebAssembly\n• 고정 수수료\n• 타입이 있는 레저 객체",
          },
          visual: "⚖️",
        },
        {
          title: { es: "¿Qué es Xahau?", en: "What is Xahau?", jp: "Xahauとは？", ko: "Xahau란?" },
          content: {
            es: "Blockchain de capa 1 basada en XRPL\n\n• Smart Contracts nativos (Hooks)\n• Token nativo: XAH\n• Transacciones tipadas\n• Fees bajos y predecibles\n• Finalidad en 3-5 segundos",
            en: "Layer 1 blockchain based on XRPL\n\n• Native Smart Contracts (Hooks)\n• Native token: XAH\n• Typed transactions\n• Low and predictable fees\n• Finality in 3-5 seconds",
            jp: "XRPLベースのレイヤー1ブロックチェーン\n\n• ネイティブスマートコントラクト（Hooks）\n• ネイティブトークン：XAH\n• 型付きトランザクション\n• 低く予測可能な手数料\n• 3〜5秒での最終確定",
            ko: "XRPL 기반의 레이어 1 블록체인\n\n• 네이티브 스마트 컨트랙트 (Hooks)\n• 네이티브 토큰: XAH\n• 타입이 있는 트랜잭션\n• 낮고 예측 가능한 수수료\n• 3~5초 최종성",
          },
          visual: "🧱",
        },
        {
          title: { es: "Arquitectura del Ledger", en: "Ledger Architecture", jp: "レジャーアーキテクチャ", ko: "레저 구조" },
          content: {
            es: "El ledger de Xahau contiene objetos nativos:\n\n• AccountRoot → Cuentas\n• TrustLine → Líneas de confianza\n• Offer → Órdenes de intercambio\n• URIToken → NFTs\n• Hook → Smart contracts\n• HookState → Estado de los Hooks",
            en: "The Xahau ledger contains native objects:\n\n• AccountRoot → Accounts\n• TrustLine → Trust lines\n• Offer → Trade orders\n• URIToken → NFTs\n• Hook → Smart contracts\n• HookState → Hook state data",
            jp: "Xahauレジャーにはネイティブオブジェクトが含まれる：\n\n• AccountRoot → アカウント\n• TrustLine → トラストライン\n• Offer → 取引注文\n• URIToken → NFT\n• Hook → スマートコントラクト\n• HookState → Hookの状態データ",
            ko: "Xahau 레저에는 네이티브 객체가 있습니다:\n\n• AccountRoot → 계정\n• TrustLine → 신뢰선\n• Offer → 거래 주문\n• URIToken → NFT\n• Hook → 스마트 컨트랙트\n• HookState → Hook 상태 데이터",
          },
          visual: "📦",
        },
      ],
    },
    {
      id: "m1l2",
      title: {
        es: "Estructura del ledger en Xahau",
        en: "Ledger Structure in Xahau",
        jp: "Xahauのレジャー構造",
        ko: "Xahau의 레저 구조",
      },
      theory: {
        es: `El **ledger** (libro mayor) de Xahau es una base de datos distribuida que almacena el estado completo de la red en un momento dado. Cada ledger tiene un **número de secuencia** único y contiene todos los objetos del estado actual.

### Componentes del Ledger

Cada versión del ledger incluye:
- **Ledger Header**: Metadatos (hash, secuencia, timestamp, fees)
- **State Tree**: Todos los objetos del ledger (cuentas, tokens, hooks, etc.)
- **Transaction Set**: Transacciones que produjeron este ledger

### Tipos de objetos del Ledger

Los objetos están **tipados**, cada tipo tiene campos específicos y predefinidos:

- **AccountRoot**: Representa una cuenta con su balance, secuencia, flags y hooks instalados
- **RippleState (TrustLine)**: Línea de confianza entre dos cuentas para un token
- **Offer**: Orden de compra/venta en el DEX nativo
- **URIToken**: Token no fungible con URI asociado
- **HookDefinition**: Código WASM de un Hook desplegado
- **HookState**: Datos persistentes almacenados por un Hook

### Diferencia clave con EVM

En Ethereum, el estado es un **árbol de cuentas** donde cada cuenta tiene su propio **storage** (key-value arbitrario). En Xahau, el estado son **objetos tipados** con campos predefinidos. Esto es más restrictivo pero mucho más eficiente y fácil de consultar.`,
        en: `The Xahau **ledger** is a distributed database that stores the complete state of the network at a given point in time. Each ledger has a unique **sequence number** and contains all objects of the current state.

### Ledger Components

Each ledger version includes:
- **Ledger Header**: Metadata (hash, sequence, timestamp, fees)
- **State Tree**: All ledger objects (accounts, tokens, hooks, etc.)
- **Transaction Set**: Transactions that produced this ledger

### Ledger Object Types

Objects are **typed**, each type has specific, predefined fields:

- **AccountRoot**: Represents an account with its balance, sequence, flags, and installed hooks
- **RippleState (TrustLine)**: Trust line between two accounts for a token
- **Offer**: Buy/sell order on the native DEX
- **URIToken**: Non-fungible token with an associated URI
- **HookDefinition**: WASM code of a deployed Hook
- **HookState**: Persistent data stored by a Hook

### Key Difference from EVM

In Ethereum, the state is an **account tree** where each account has its own **storage** (arbitrary key-value). In Xahau, the state consists of **typed objects** with predefined fields. This is more restrictive but much more efficient and easier to query.`,
        jp: `Xahauの**レジャー**（台帳）は、特定の時点におけるネットワークの完全な状態を格納する分散データベースです。各レジャーには固有の**シーケンス番号**があり、現在の状態のすべてのオブジェクトが含まれています。

### レジャーのコンポーネント

各レジャーバージョンには以下が含まれます：
- **レジャーヘッダー**：メタデータ（ハッシュ、シーケンス、タイムスタンプ、手数料）
- **状態ツリー**：すべてのレジャーオブジェクト（アカウント、トークン、Hooksなど）
- **トランザクションセット**：このレジャーを生成したトランザクション

### レジャーオブジェクトの種類

オブジェクトは**型付き**されており、各種類には特定の事前定義されたフィールドがあります：

- **AccountRoot**：残高、シーケンス、フラグ、インストールされたHooksを持つアカウントを表す
- **RippleState（TrustLine）**：2つのアカウント間のトークンに対するトラストライン
- **Offer**：ネイティブDEXでの売買オファー
- **URIToken**：URIに紐づく非代替性トークン
- **HookDefinition**：デプロイされたHookのWASMコード
- **HookState**：Hookによって格納された永続的なデータ

### EVMとの主要な違い

Ethereumでは、状態は各アカウントが独自の**ストレージ**（任意のキーバリュー）を持つ**アカウントツリー**です。Xahauでは、状態は事前定義されたフィールドを持つ**型付きオブジェクト**です。これはより制限的ですが、はるかに効率的でクエリが容易です。`,
        ko: `Xahau의 **레저(ledger)**는 특정 시점의 네트워크 전체 상태를 저장하는 분산 데이터베이스입니다. 각 레저는 고유한 **시퀀스 번호**를 가지며 현재 상태의 모든 객체를 포함합니다.

### 레저 구성 요소

각 레저 버전에는 다음이 포함됩니다:
- **Ledger Header**: 해시, 시퀀스, 타임스탬프, 수수료 같은 메타데이터
- **State Tree**: 계정, 토큰, Hooks 등 모든 레저 객체
- **Transaction Set**: 이 레저를 만든 트랜잭션 집합

### 레저 객체 유형

Xahau의 객체는 **타입이 정해져 있으며**, 각 타입은 고정된 필드를 가집니다:

- **AccountRoot**: 잔액, 시퀀스, 플래그, 설치된 Hooks를 가진 계정
- **RippleState (TrustLine)**: 두 계정 사이의 토큰 신뢰선
- **Offer**: 네이티브 DEX의 매수/매도 주문
- **URIToken**: URI가 연결된 NFT
- **HookDefinition**: 배포된 Hook의 WASM 코드
- **HookState**: Hook이 저장한 영속 데이터

### EVM과의 핵심 차이

Ethereum에서는 상태가 각 계정의 임의 key-value storage로 표현됩니다. Xahau에서는 상태가 **미리 정의된 필드를 가진 타입 객체**로 표현됩니다. 더 제한적이지만 그만큼 효율적이고 조회가 쉽습니다.`,
      },
      codeBlocks: [
        {
          title: {
            es: "Consultar información del ledger actual",
            en: "Query current ledger information",
            jp: "現在のレジャー情報を照会する",
            ko: "현재 레저 정보 조회하기",
          },
          language: "javascript",
          code: {
            es: `const { Client } = require("xahau");

async function getLedgerInfo() {
  const client = new Client("wss://xahau.network");
  await client.connect();

  const response = await client.request({
    command: "ledger",
    ledger_index: "validated",
  });

  const ledger = response.result.ledger;
  console.log("Seq del Ledger:", ledger.ledger_index);
  console.log("Hash:", ledger.ledger_hash);
  console.log("Cerrado:", ledger.close_time_human);

  await client.disconnect();
}

getLedgerInfo();`,
            en: `const { Client } = require("xahau");

async function getLedgerInfo() {
  const client = new Client("wss://xahau.network");
  await client.connect();

  const response = await client.request({
    command: "ledger",
    ledger_index: "validated",
  });

  const ledger = response.result.ledger;
  console.log("Ledger Seq:", ledger.ledger_index);
  console.log("Hash:", ledger.ledger_hash);
  console.log("Closed:", ledger.close_time_human);

  await client.disconnect();
}

getLedgerInfo();`,
            jp: `const { Client } = require("xahau");

async function getLedgerInfo() {
  const client = new Client("wss://xahau.network");
  await client.connect();

  const response = await client.request({
    command: "ledger",
    ledger_index: "validated",
  });

  const ledger = response.result.ledger;
  console.log("レジャーシーケンス:", ledger.ledger_index);
  console.log("ハッシュ:", ledger.ledger_hash);
  console.log("クローズ時刻:", ledger.close_time_human);

  await client.disconnect();
}

getLedgerInfo();`,
            ko: `const { Client } = require("xahau");

async function getLedgerInfo() {
  const client = new Client("wss://xahau.network");
  await client.connect();

  const response = await client.request({
    command: "ledger",
    ledger_index: "validated",
  });

  const ledger = response.result.ledger;
  console.log("레저 시퀀스:", ledger.ledger_index);
  console.log("해시:", ledger.ledger_hash);
  console.log("닫힌 시각:", ledger.close_time_human);

  await client.disconnect();
}

getLedgerInfo();`,
          },
        },
      ],
      slides: [
        {
          title: { es: "El Ledger de Xahau", en: "The Xahau Ledger", jp: "Xahauのレジャー", ko: "Xahau의 레저" },
          content: {
            es: "Base de datos distribuida con el estado completo\n\n• Cada ledger tiene un número de secuencia\n• Se cierra cada 3-5 segundos\n• Contiene todos los objetos del estado\n• Inmutable una vez validado",
            en: "Distributed database with the complete state\n\n• Each ledger has a sequence number\n• Closes every 3-5 seconds\n• Contains all state objects\n• Immutable once validated",
            jp: "完全な状態を持つ分散データベース\n\n• 各レジャーにはシーケンス番号がある\n• 3〜5秒ごとにクローズする\n• すべての状態オブジェクトを含む\n• 検証後は不変",
            ko: "전체 상태를 담은 분산 데이터베이스\n\n• 각 레저는 시퀀스 번호를 가짐\n• 3~5초마다 닫힘\n• 모든 상태 객체를 포함\n• 검증 후 변경 어려움",
          },
          visual: "📖",
        },
        {
          title: { es: "Objetos del Ledger", en: "Ledger Objects", jp: "レジャーオブジェクト", ko: "레저 객체" },
          content: {
            es: "Objetos tipados y estructurados:\n\n• AccountRoot → Cuentas\n• RippleState → TrustLines\n• Offer → Órdenes DEX\n• URIToken → NFTs\n• HookDefinition → Código de Hooks\n• HookState → Estado de Hooks",
            en: "Typed and structured objects:\n\n• AccountRoot → Accounts\n• RippleState → TrustLines\n• Offer → DEX orders\n• URIToken → NFTs\n• HookDefinition → Hook code\n• HookState → Hook state data",
            jp: "型付きかつ構造化されたオブジェクト：\n\n• AccountRoot → アカウント\n• RippleState → トラストライン\n• Offer → DEX注文\n• URIToken → NFT\n• HookDefinition → Hookコード\n• HookState → Hookの状態データ",
            ko: "타입이 정해진 구조화 객체:\n\n• AccountRoot → 계정\n• RippleState → TrustLine\n• Offer → DEX 주문\n• URIToken → NFT\n• HookDefinition → Hook 코드\n• HookState → Hook 상태 데이터",
          },
          visual: "🗂️",
        },
        {
          title: { es: "Detalle de objetos del Ledger", en: "Ledger Object Details", jp: "レジャーオブジェクトの詳細", ko: "레저 객체 상세" },
          content: {
            es: "Cada objeto tiene campos predefinidos:\n\n• AccountRoot → Balance, Sequence, Flags, Hooks\n• RippleState → Saldo entre dos cuentas para un token\n• Offer → Precio, cantidad, par de intercambio\n• DirectoryNode → Índice que conecta objetos\n\nDiferencia con EVM:\n• Sin storage arbitrario (key-value)\n• Campos fijos → consultas más eficientes",
            en: "Each object has predefined fields:\n\n• AccountRoot → Balance, Sequence, Flags, Hooks\n• RippleState → Balance between two accounts for a token\n• Offer → Price, amount, trading pair\n• DirectoryNode → Index connecting objects\n\nDifference from EVM:\n• No arbitrary storage (key-value)\n• Fixed fields → more efficient queries",
            jp: "各オブジェクトには事前定義されたフィールドがある：\n\n• AccountRoot → 残高、シーケンス、フラグ、Hooks\n• RippleState → 2つのアカウント間のトークン残高\n• Offer → 価格、数量、取引ペア\n• DirectoryNode → オブジェクトを接続するインデックス\n\nEVMとの違い：\n• 任意ストレージなし（キーバリュー）\n• 固定フィールド → より効率的なクエリ",
            ko: "각 객체는 미리 정의된 필드를 가집니다:\n\n• AccountRoot → 잔액, 시퀀스, 플래그, Hooks\n• RippleState → 두 계정 간 토큰 잔액\n• Offer → 가격, 수량, 거래 쌍\n• DirectoryNode → 객체를 연결하는 인덱스\n\nEVM과의 차이:\n• 임의 storage 없음 (key-value)\n• 고정 필드 → 더 효율적인 조회",
          },
          visual: "🔍",
        },
      ],
    },
    {
      id: "m1l3",
      title: {
        es: "Historia de las blockchains: de Bitcoin a Xahau",
        en: "History of Blockchains: from Bitcoin to Xahau",
        jp: "ブロックチェーンの歴史：ビットコインからXahauまで",
        ko: "블록체인 역사: 비트코인에서 Xahau까지",
      },
      theory: {
        es: `Para entender por qué Xahau existe y qué la hace diferente, necesitamos recorrer la **historia de las blockchains** y cómo cada generación resolvió problemas que la anterior no podía.

### 2008 — Bitcoin: el nacimiento

Todo empezó con un documento de 9 páginas publicado por **Satoshi Nakamoto** bajo el título *"Bitcoin: A Peer-to-Peer Electronic Cash System"*. La idea era simple y revolucionaria: **dinero digital sin intermediarios**.

Bitcoin introdujo:
- **Proof of Work (PoW)**: Los mineros resuelven problemas matemáticos para validar transacciones
- **Descentralización total**: Sin bancos, sin servidores centrales
- **Inmutabilidad**: Las transacciones confirmadas no se pueden revertir
- **Escasez digital**: Solo existirán 21 millones de BTC

Limitación: Bitcoin es lento (~7 transacciones por segundo) y su lenguaje de scripting es muy limitado. No fue diseñado para ejecutar lógica compleja.

### 2012 — XRP Ledger: velocidad sin minería

Más adelante se creó el **XRP Ledger (o XRPL)**, la primera blockchain importante que **no usa Proof of Work**. En su lugar, usa un protocolo de consenso basado en **validadores de confianza (UNL)**.

XRPL introdujo:
- **Consenso sin minería**: Transacciones confirmadas en 3-5 segundos
- **DEX nativo**: Intercambio descentralizado integrado en el protocolo
- **Tokens nativos**: Crear tokens sin necesidad de smart contracts
- **Fees mínimos**: Fracciones de centavo por transacción

Limitación: XRPL no tenía capacidad para ejecutar smart contracts (lógica programable personalizada).

### 2015 — Ethereum: la computadora mundial

**Vitalik Buterin** publicó el whitepaper de Ethereum con una idea ambiciosa: una blockchain que pudiera ejecutar **cualquier programa**. Así nació la **Ethereum Virtual Machine (EVM)**.

Ethereum introdujo:
- **Smart contracts**: Programas que viven en la blockchain y se ejecutan automáticamente
- **Solidity**: Lenguaje de programación para escribir contratos
- **EVM**: Máquina virtual que ejecuta el código de los contratos
- **ERC-20 / ERC-721**: Estándares para tokens fungibles y NFTs
- **DeFi**: Finanzas descentralizadas (préstamos, exchanges, stablecoins)

Limitación: Gas caro y variable, baja velocidad (~15 TPS), escalabilidad limitada.

### 2020+ — Explosión de L1s y L2s

Los problemas de Ethereum impulsaron una oleada de nuevas blockchains:

- **Solana** (2020): Alta velocidad (~65,000 TPS teóricos) con Proof of History
- **Avalanche** (2020): Subredes personalizables con consenso rápido
- **Polygon** (2020): Solución Layer 2 para escalar Ethereum
- **Arbitrum / Optimism** (2021): Rollups que procesan transacciones fuera de Ethereum
- **Cosmos / Polkadot**: Ecosistemas de blockchains interconectadas

La mayoría de estas redes son **compatibles con EVM** usan Solidity y herramientas de Ethereum.

### 2023 — Xahau: XRPL + Smart Contracts

**Xahau** nace como un **fork del XRP Ledger** que añade la capacidad que XRPL siempre necesitó: **smart contracts**, llamados **Hooks**. Inicialmente Xahau no iba a existir y los Hooks iban a ser parte de XRP Ledger pero Ripple no quiso aceptar esta mejora de la comunidad. Por no desaprovechar el trabajo realizado durante años, Xahau nació.

Xahau introdujo:
- **Hooks**: Smart contracts escritos en C y compilados a WebAssembly
- **XAH**: Token nativo con sistema de emisiones/recompensas
- **Herencia de XRPL**: Conserva la velocidad, el DEX nativo y los fees bajos
- **Sin EVM**: Arquitectura propia, no compatible con Solidity

### ¿Por qué Xahau es un fork de XRPL?

Xahau al ser un fork de XRPL, aprovecha todas las ventajas de una blockchain probada y optimizada para pagos y tokens, y le añade la pieza que faltaba: la capacidad de ejecutar lógica programable directamente en el protocolo.

1. **Base probada**: XRPL lleva funcionando desde 2012 sin interrupciones graves
2. **Velocidad nativa**: El consenso de XRPL ya ofrece 3-5 segundos de finalidad
3. **DEX integrado**: No hay que construir un exchange descentralizado desde cero
4. **Tokens nativos**: El sistema de TrustLines y tokens ya existe y funciona
5. **Comunidad existente**: Desarrolladores y herramientas de XRPL pueden adaptarse

### Línea temporal resumida

| Año | Hito | Innovación clave |
|---|---|---|
| 2008 | Bitcoin | Dinero digital descentralizado |
| 2012 | XRP Ledger | Consenso sin minería, DEX nativo |
| 2015 | Ethereum | Smart contracts (EVM + Solidity) |
| 2017 | ICO boom | Tokens ERC-20, financiación descentralizada |
| 2020 | DeFi Summer | Finanzas descentralizadas en Ethereum |
| 2020+ | L1s/L2s | Solana, Avalanche, Polygon, Rollups |
| 2023 | Xahau | XRPL + Hooks (smart contracts en C/WASM) |`,
        en: `To understand why Xahau exists and what makes it different, we need to go through the **history of blockchains** and how each generation solved problems that the previous one could not.

### 2008 — Bitcoin: The Birth

It all started with a 9-page document published by **Satoshi Nakamoto** titled *"Bitcoin: A Peer-to-Peer Electronic Cash System"*. The idea was simple and revolutionary: **digital money without intermediaries**.

Bitcoin introduced:
- **Proof of Work (PoW)**: Miners solve mathematical problems to validate transactions
- **Total decentralization**: No banks, no central servers
- **Immutability**: Confirmed transactions cannot be reversed
- **Digital scarcity**: Only 21 million BTC will ever exist

Limitation: Bitcoin is slow (~7 transactions per second) and its scripting language is very limited. It was not designed to execute complex logic.

### 2012 — XRP Ledger: Speed Without Mining

Later, the **XRP Ledger (or XRPL)** was created, the first major blockchain that **does not use Proof of Work**. Instead, it uses a consensus protocol based on **trusted validators (UNL)**.

XRPL introduced:
- **Consensus without mining**: Transactions confirmed in 3-5 seconds
- **Native DEX**: Decentralized exchange integrated into the protocol
- **Native tokens**: Create tokens without needing smart contracts
- **Minimal fees**: Fractions of a cent per transaction

Limitation: XRPL did not have the ability to execute smart contracts (custom programmable logic).

### 2015 — Ethereum: The World Computer

**Vitalik Buterin** published the Ethereum whitepaper with an ambitious idea: a blockchain that could execute **any program**. Thus the **Ethereum Virtual Machine (EVM)** was born.

Ethereum introduced:
- **Smart contracts**: Programs that live on the blockchain and execute automatically
- **Solidity**: Programming language for writing contracts
- **EVM**: Virtual machine that executes contract code
- **ERC-20 / ERC-721**: Standards for fungible tokens and NFTs
- **DeFi**: Decentralized finance (lending, exchanges, stablecoins)

Limitation: Expensive and variable gas, low speed (~15 TPS), limited scalability.

### 2020+ — The L1 and L2 Explosion

Ethereum's problems drove a wave of new blockchains:

- **Solana** (2020): High speed (~65,000 theoretical TPS) with Proof of History
- **Avalanche** (2020): Customizable subnets with fast consensus
- **Polygon** (2020): Layer 2 solution for scaling Ethereum
- **Arbitrum / Optimism** (2021): Rollups that process transactions off Ethereum
- **Cosmos / Polkadot**: Ecosystems of interconnected blockchains

Most of these networks are **EVM-compatible**, they use Solidity and Ethereum tools.

### 2023 — Xahau: XRPL + Smart Contracts

**Xahau** was born as a **fork of the XRP Ledger** that adds the capability XRPL always needed: **smart contracts**, called **Hooks**. Initially Xahau was not going to exist and Hooks were going to be part of the XRP Ledger, but Ripple did not want to accept this community improvement. In order not to waste the work done over years, Xahau was born.

Xahau introduced:
- **Hooks**: Smart contracts written in C and compiled to WebAssembly
- **XAH**: Native token with an emission/reward system
- **XRPL inheritance**: Retains the speed, native DEX, and low fees
- **No EVM**: Its own architecture, not compatible with Solidity

### Why Is Xahau a Fork of XRPL?

As a fork of XRPL, Xahau leverages all the advantages of a proven blockchain optimized for payments and tokens, and adds the missing piece: the ability to execute programmable logic directly in the protocol.

1. **Proven foundation**: XRPL has been running since 2012 without major disruptions
2. **Native speed**: XRPL's consensus already offers 3-5 second finality
3. **Integrated DEX**: No need to build a decentralized exchange from scratch
4. **Native tokens**: The TrustLines and token system already exists and works
5. **Existing community**: XRPL developers and tools can adapt

### Timeline Summary

| Year | Milestone | Key Innovation |
|---|---|---|
| 2008 | Bitcoin | Decentralized digital money |
| 2012 | XRP Ledger | Consensus without mining, native DEX |
| 2015 | Ethereum | Smart contracts (EVM + Solidity) |
| 2017 | ICO boom | ERC-20 tokens, decentralized funding |
| 2020 | DeFi Summer | Decentralized finance on Ethereum |
| 2020+ | L1s/L2s | Solana, Avalanche, Polygon, Rollups |
| 2023 | Xahau | XRPL + Hooks (smart contracts in C/WASM) |`,
        jp: `Xahauがなぜ存在し、何が違うのかを理解するために、**ブロックチェーンの歴史**を振り返り、各世代が前の世代では解決できなかった問題をどのように解決したかを見ていきましょう。

### 2008年 — Bitcoin：誕生

すべては**サトシ・ナカモト**が公開した*「Bitcoin: A Peer-to-Peer Electronic Cash System」*というタイトルの9ページの文書から始まりました。アイデアは**仲介者なしのデジタルマネー**というシンプルかつ革命的なものでした。

Bitcoinが導入したものは次の通りです。
- **Proof of Work (PoW)**：マイナーが数学的問題を解いてトランザクションを検証する
- **完全な分散化**：銀行なし、中央サーバーなし
- **不変性**：確認されたトランザクションは取り消せない
- **デジタル希少性**：Bitcoinは2,100万枚しか存在しない

限界：Bitcoinは遅く（毎秒約7トランザクション）、スクリプト言語は非常に限定的。複雑なロジックを実行するために設計されていない。

### 2012年 — XRP Ledger：マイニングなしの速度

後に**XRP Ledger（XRPL）**が作られました。**PoWを使用しない**最初の主要なブロックチェーンです。代わりに、**信頼できるバリデーター（UNL）**に基づくコンセンサスプロトコルを使用します。

XRPLが導入したものは次の通りです。
- **マイニングなしのコンセンサス**：3〜5秒でトランザクションが確定する
- **ネイティブDEX**：プロトコルに統合された分散取引所
- **ネイティブのトークン発行**：スマートコントラクトなしでトークンを作成
- **少ない手数料**：トランザクションあたり数セント

限界：XRPLにはスマートコントラクト（カスタムプログラマブルロジック）を実行する能力がなかった。

### 2015年 — Ethereum：ワールドコンピュータ

**ヴィタリック・ブテリン**は**あらゆるプログラム**を実行できるブロックチェーンといった野心的なアイデアを持つEthereumホワイトペーパーを発表しました。こうして**Ethereum Virtual Machine（EVM）**が誕生しました。

Ethereumが導入したものは次の通りです。
- **スマートコントラクト**：ブロックチェーン上に存在し自動的に実行されるプログラム
- **Solidity**：コントラクトを書くためのプログラミング言語
- **EVM**：コントラクトコードを実行する仮想マシン
- **ERC-20 / ERC-721**：代替可能トークンとNFTの標準
- **DeFi**：分散型金融（貸付、取引所、ステーブルコイン）

限界：高価で変動するガス、低速（約15 TPS）、限られたスケーラビリティ。

### 2020年以降 — L1とL2の爆発

Ethereumの問題が新しいブロックチェーンの波を引き起こしました：

- **Solana**（2020年）：Proof of Historyによる高速（理論値約65,000 TPS）
- **Avalanche**（2020年）：高速コンセンサスによるカスタマイズ可能なサブネット
- **Polygon**（2020年）：Ethereumをスケールするためのレイヤー2ソリューション
- **Arbitrum / Optimism**（2021年）：Ethereum外でトランザクションを処理するロールアップ
- **Cosmos / Polkadot**：相互接続されたブロックチェーンのエコシステム

これらのネットワークのほとんどは**EVM互換**で、SolidityとEthereumのツールを使用します。

### 2023年 — Xahau：XRPL + スマートコントラクト

**Xahau**は**XRP Ledgerのフォーク**として誕生し、XRPLが常に必要としていた**スマートコントラクト**（**Hooks**と呼ばれる）機能を追加しました。当初XahauはXRP Ledgerの一部になる予定でHooksがXRP Ledgerに組み込まれる予定でしたが、Rippleはコミュニティのこの改善を受け入れませんでした。何年もかけてきた作業を無駄にしないために、Xahauが誕生しました。

Xahauが導入したもの：
- **Hooks**：Cで書かれWebAssemblyにコンパイルされたスマートコントラクト
- **XAH**：エミッション/報酬システムを持つネイティブトークン
- **XRPLの継承**：速度、ネイティブDEX、低手数料を維持
- **EVMなし**：独自のアーキテクチャ、Solidityと互換性なし

### なぜXahauはXRPLのフォークなのか？

XRPLのフォークとして、Xahauは支払いとトークンのために実証され最適化されたブロックチェーンのすべての利点を活用し、プロトコル内で直接プログラマブルロジックを実行するという欠けていたピースを追加しました。

1. **実証済みの基盤**：XRPLは2012年から大きな中断なく稼働している
2. **ネイティブな速度**：XRPLのコンセンサスはすでに3〜5秒の最終確定を提供する
3. **統合DEX**：分散取引所をゼロから構築する必要がない
4. **ネイティブのトークン発行**：トラストラインとトークンシステムはすでに存在し機能している
5. **既存のコミュニティ**：XRPLの開発者とツールが適応できる

### 年表まとめ

| 年 | マイルストーン | 主要なイノベーション |
|---|---|---|
| 2008 | Bitcoin | 分散型デジタルマネー |
| 2012 | XRP Ledger | マイニングなしのコンセンサス、ネイティブDEX |
| 2015 | Ethereum | スマートコントラクト（EVM + Solidity） |
| 2017 | ICOブーム | ERC-20トークン、分散型資金調達 |
| 2020 | DeFiサマー | Ethereum上の分散型金融 |
| 2020以降 | L1/L2 | Solana、Avalanche、Polygon、ロールアップ |
| 2023 | Xahau | XRPL + Hooks（C/WASMのスマートコントラクト） |`,
        ko: `Xahau가 왜 존재하게 되었고 무엇이 다른지 이해하려면, **블록체인의 역사**와 각 세대가 이전 세대의 한계를 어떻게 해결했는지 살펴봐야 합니다.

### 2008 — 비트코인: 시작

모든 것은 **사토시 나카모토**가 발표한 *"Bitcoin: A Peer-to-Peer Electronic Cash System"*에서 시작되었습니다. 핵심 아이디어는 **중개자 없는 디지털 화폐**였습니다.

비트코인이 가져온 변화:
- **작업증명(PoW)**: 채굴자가 계산 문제를 풀어 거래를 검증
- **완전한 탈중앙화**: 은행도 중앙 서버도 없음
- **불변성**: 확정된 거래는 되돌리기 어려움
- **디지털 희소성**: BTC는 2,100만 개로 제한

한계: 속도가 느리고(초당 약 7건), 스크립트 기능이 제한적이었습니다.

### 2012 — XRP Ledger: 채굴 없는 속도

이후 **XRP Ledger (XRPL)**가 등장했습니다. 이는 **작업증명을 사용하지 않는** 대표적 블록체인입니다. 대신 **신뢰된 검증자(UNL)** 기반 합의를 사용합니다.

XRPL이 도입한 것:
- **채굴 없는 합의**: 3~5초 내 트랜잭션 확정
- **네이티브 DEX**: 프로토콜에 통합된 탈중앙 거래소
- **네이티브 토큰 발행**: 스마트 컨트랙트 없이 토큰 생성
- **낮은 수수료**

한계: 사용자 정의 스마트 컨트랙트를 실행할 수 없었습니다.

### 2015 — Ethereum: 월드 컴퓨터

**비탈릭 부테린**은 **어떤 프로그램이든 실행할 수 있는 블록체인**이라는 비전을 제시했고, 그 결과 **Ethereum Virtual Machine (EVM)**이 탄생했습니다.

Ethereum이 도입한 것:
- **스마트 컨트랙트**
- **Solidity**
- **EVM**
- **ERC-20 / ERC-721**
- **DeFi**

한계: 비싸고 변동적인 가스비, 느린 속도, 제한된 확장성.

### 2020+ — L1과 L2의 확산

Ethereum의 한계는 새로운 블록체인들의 등장을 이끌었습니다:

- **Solana**: 높은 속도
- **Avalanche**: 맞춤형 서브넷
- **Polygon**: Ethereum용 Layer 2
- **Arbitrum / Optimism**: 롤업
- **Cosmos / Polkadot**: 상호 연결된 체인 생태계

이들 대부분은 여전히 **EVM 호환**이며 Solidity 도구를 사용합니다.

### 2023 — Xahau: XRPL + 스마트 컨트랙트

**Xahau**는 **XRP Ledger의 포크**로 탄생했고, XRPL이 오랫동안 필요로 했던 **스마트 컨트랙트 기능**, 즉 **Hooks**를 추가했습니다. 원래 Hooks는 XRPL에 직접 들어갈 가능성이 있었지만 받아들여지지 않았고, 수년간의 작업을 살리기 위해 Xahau가 만들어졌습니다.

Xahau가 도입한 것:
- **Hooks**: C로 작성해 WebAssembly로 컴파일하는 스마트 컨트랙트
- **XAH**: 보상/발행 시스템이 있는 네이티브 토큰
- **XRPL의 장점 계승**: 빠른 속도, 네이티브 DEX, 낮은 수수료
- **비 EVM 구조**: Solidity와 호환되지 않음

### 왜 XRPL의 포크인가?

Xahau는 XRPL이 이미 갖고 있던 강점을 활용하면서, 프로토콜 안에서 직접 프로그래밍 가능한 로직을 실행하는 기능을 더했습니다.

1. **검증된 기반**: XRPL은 2012년부터 안정적으로 운영
2. **네이티브 속도**: 이미 3~5초 최종성 제공
3. **통합 DEX**
4. **기존 토큰/TrustLine 시스템**
5. **기존 커뮤니티와 도구 활용 가능**

### 연표 요약

| 연도 | 이정표 | 핵심 혁신 |
|---|---|---|
| 2008 | Bitcoin | 탈중앙 디지털 화폐 |
| 2012 | XRP Ledger | 채굴 없는 합의, 네이티브 DEX |
| 2015 | Ethereum | 스마트 컨트랙트 (EVM + Solidity) |
| 2017 | ICO 붐 | ERC-20 토큰, 탈중앙 자금 조달 |
| 2020 | DeFi Summer | Ethereum 기반 탈중앙 금융 |
| 2020+ | L1/L2 | Solana, Avalanche, Polygon, Rollups |
| 2023 | Xahau | XRPL + Hooks (C/WASM 스마트 컨트랙트) |`,
      },
      codeBlocks: [],
      slides: [
        {
          title: { es: "2008-2015: Los orígenes", en: "2008-2015: The Origins", jp: "2008-2015年：起源", ko: "2008-2015: 시작" },
          content: {
            es: "2008 — Bitcoin\n• Primer dinero digital descentralizado\n• Proof of Work, lento pero revolucionario\n\n2012 — XRP Ledger\n• Sin minería, consenso en 3-5 segundos\n• DEX nativo y tokens integrados\n\n2015 — Ethereum\n• Smart contracts con Solidity\n• La EVM como computadora mundial",
            en: "2008 — Bitcoin\n• First decentralized digital money\n• Proof of Work, slow but revolutionary\n\n2012 — XRP Ledger\n• No mining, consensus in 3-5 seconds\n• Native DEX and integrated tokens\n\n2015 — Ethereum\n• Smart contracts with Solidity\n• The EVM as a world computer",
            jp: "2008年 — Bitcoin\n• 最初の分散型デジタルマネー\n• プルーフ・オブ・ワーク、遅いが革命的\n\n2012年 — XRP Ledger\n• マイニングなし、3〜5秒でコンセンサス\n• ネイティブDEXと統合トークン\n\n2015年 — Ethereum\n• Solidityによるスマートコントラクト\n• ワールドコンピュータとしてのEVM",
            ko: "2008 — Bitcoin\n• 최초의 탈중앙 디지털 화폐\n• 작업증명, 느리지만 혁신적\n\n2012 — XRP Ledger\n• 채굴 없음, 3~5초 합의\n• 네이티브 DEX와 토큰\n\n2015 — Ethereum\n• Solidity 기반 스마트 컨트랙트\n• 월드 컴퓨터로서의 EVM",
          },
          visual: "📜",
        },
        {
          title: { es: "2020+: La explosión", en: "2020+: The Explosion", jp: "2020年以降：爆発", ko: "2020+: 확산" },
          content: {
            es: "Los problemas de Ethereum impulsan nuevas redes:\n\n• Solana → Alta velocidad\n• Avalanche → Subredes personalizables\n• Polygon → Layer 2 para Ethereum\n• Arbitrum/Optimism → Rollups\n\nLa mayoría son compatibles con EVM (Solidity)",
            en: "Ethereum's problems drive new networks:\n\n• Solana → High speed\n• Avalanche → Customizable subnets\n• Polygon → Layer 2 for Ethereum\n• Arbitrum/Optimism → Rollups\n\nMost are EVM-compatible (Solidity)",
            jp: "Ethereumの問題が新しいネットワークを生む：\n\n• Solana → 高速\n• Avalanche → カスタマイズ可能なサブネット\n• Polygon → Ethereum用レイヤー2\n• Arbitrum/Optimism → ロールアップ\n\nほとんどがEVM互換（Solidity）",
            ko: "Ethereum의 문제는 새로운 네트워크를 낳았습니다:\n\n• Solana → 높은 속도\n• Avalanche → 맞춤형 서브넷\n• Polygon → Ethereum용 Layer 2\n• Arbitrum/Optimism → 롤업\n\n대부분은 EVM 호환 (Solidity 사용)",
          },
          visual: "🚀",
        },
        {
          title: { es: "2023: Nace Xahau", en: "2023: Xahau Is Born", jp: "2023年：Xahauの誕生", ko: "2023: Xahau의 탄생" },
          content: {
            es: "Fork de XRPL + Smart Contracts (Hooks)\n\n¿Por qué un fork de XRPL?\n• Base probada desde 2012\n• Velocidad nativa (3-5 seg)\n• DEX y tokens integrados\n• Solo faltaban smart contracts\n\nHooks = C compilado a WebAssembly\nSin EVM, sin Solidity",
            en: "Fork of XRPL + Smart Contracts (Hooks)\n\nWhy a fork of XRPL?\n• Proven foundation since 2012\n• Native speed (3-5 sec)\n• Integrated DEX and tokens\n• Only smart contracts were missing\n\nHooks = C compiled to WebAssembly\nNo EVM, no Solidity",
            jp: "XRPLのフォーク + スマートコントラクト（Hooks）\n\nなぜXRPLのフォークなのか？\n• 2012年からの実証済みの基盤\n• ネイティブな速度（3〜5秒）\n• DEXとトークンが統合済み\n• スマートコントラクトだけが欠けていた\n\nHooks = CをWebAssemblyにコンパイル\nEVMなし、Solidityなし",
            ko: "XRPL의 포크 + 스마트 컨트랙트 (Hooks)\n\n왜 XRPL 포크인가?\n• 2012년부터 검증된 기반\n• 네이티브 속도 (3~5초)\n• 통합 DEX와 토큰\n• 부족했던 것은 스마트 컨트랙트뿐\n\nHooks = C를 WebAssembly로 컴파일\nEVM 없음, Solidity 없음",
          },
          visual: "🧱",
        },
        {
          title: { es: "Línea temporal completa", en: "Complete Timeline", jp: "完全な年表", ko: "전체 타임라인" },
          content: {
            es: "2008 → Bitcoin (PoW, dinero digital)\n2012 → XRPL (sin minería, DEX)\n2015 → Ethereum (EVM, Solidity)\n2017 → Boom de ICOs y tokens\n2020 → DeFi + nuevas L1s/L2s\n2023 → Xahau (XRPL + Hooks)\n\nCada generación resolvió limitaciones de la anterior",
            en: "2008 → Bitcoin (PoW, digital money)\n2012 → XRPL (no mining, DEX)\n2015 → Ethereum (EVM, Solidity)\n2017 → ICO and token boom\n2020 → DeFi + new L1s/L2s\n2023 → Xahau (XRPL + Hooks)\n\nEach generation solved limitations of the previous one",
            jp: "2008年 → Bitcoin（PoW、デジタルマネー）\n2012年 → XRPL（マイニングなし、DEX）\n2015年 → Ethereum（EVM、Solidity）\n2017年 → ICOとトークンのブーム\n2020年 → DeFi + 新しいL1s/L2s\n2023年 → Xahau（XRPL + Hooks）\n\n各世代は前の世代の限界を解決した",
            ko: "2008 → Bitcoin (PoW, 디지털 화폐)\n2012 → XRPL (채굴 없음, DEX)\n2015 → Ethereum (EVM, Solidity)\n2017 → ICO와 토큰 붐\n2020 → DeFi + 새로운 L1/L2\n2023 → Xahau (XRPL + Hooks)\n\n각 세대는 이전 세대의 한계를 해결했습니다",
          },
          visual: "⏳",
        },
      ],
    },
    {
      id: "m1l4",
      title: {
        es: "El ecosistema Xahau",
        en: "The Xahau Ecosystem",
        jp: "Xahauエコシステム",
        ko: "Xahau 생태계",
      },
      theory: {
        es: `Xahau no es solo una blockchain, es un **ecosistema completo** con herramientas, wallets, exploradores y una comunidad activa. En esta lección conocerás las piezas fundamentales del ecosistema para saber dónde buscar información y cómo interactuar con la red.

### XAH: el token nativo

**XAH** es la criptomoneda nativa de Xahau. A diferencia de XRP en el XRPL, XAH tiene un sistema de **emisión inflaccionario**: los titulares de cuentas activas pueden solicitar recompensas periódicas en XAH. Esto incentiva la participación en la red y el uso de ésta.

Características de XAH:
- Se usa para pagar **fees** (comisiones de transacción)
- Se necesita una **reserva mínima** para mantener una cuenta activa
- El sistema de **emisiones** distribuye XAH a cuentas activas que lo soliciten
- Se puede enviar, intercambiar y usar en Hooks

### Xaman (antes XUMM): la wallet principal

**Xaman** (anteriormente conocida como XUMM) es la wallet más utilizada en el ecosistema XRPL/Xahau. Es una aplicación móvil que te permite:

- Crear y gestionar cuentas en Xahau y XRPL
- Enviar y recibir XAH y tokens
- Firmar transacciones de forma segura
- Interactuar con aplicaciones descentralizadas (xApps)
- Disponible para **iOS** y **Android**

Descarga: [xaman.app](https://xaman.app)

### Hooks Builder: IDE online para smart contracts

**Hooks Builder** es un entorno de desarrollo integrado (IDE) que funciona en el navegador y te permite escribir, compilar y desplegar Hooks sin instalar nada en tu ordenador en Xahau Testnet.

Características:
- Editor de código con resaltado de sintaxis para C
- Compilador de C a WebAssembly integrado
- Despliegue directo a la testnet de Xahau
- Ejemplos y plantillas para empezar rápido

URL: [builder.xahau.network/](https://builder.xahau.network/)

### Exploradores de bloques

Los **exploradores** te permiten ver todo lo que ocurre en la blockchain de forma visual:

- Buscar transacciones por hash
- Ver el estado de cualquier cuenta (balance, tokens, hooks)
- Explorar ledgers y sus contenidos
- Verificar el estado de la red

Para **Xahau Mainnet**:

URL: [xahauexplorer.com](https://xahauexplorer.com)
URL: [xahau.xrplwin.com](https://xahau.xrplwin.com)
URL: [explorer.xahau.network](https://explorer.xahau.network)
URL: [xahscan.com](https://xahscan.com)

Para **Xahau Testnet**:

URL: [test.xahauexplorer.com](https://test.xahauexplorer.com)
URL: [xahau-testnet.xrplwin.com](https://xahau-testnet.xrplwin.com)
URL: [explorer.xahau-test.net](https://explorer.xahau-test.net)

### Recursos para desarrolladores

- **Documentación oficial**: [xahau.network/docs/](https://xahau.network/docs/) Guías, referencia de API y tutoriales
- **GitHub**: [https://github.com/xahau](https://github.com/xahau) Código fuente del nodo, librerías y herramientas
- **Discord**: [https://discord.gg/ds7nb93mYj](https://discord.gg/ds7nb93mYj) Comunidad activa donde hacer preguntas y compartir proyectos
- **X**: [https://x.com/XahauNetwork](https://x.com/XahauNetwork) Cuenta oficial de la blockchain Xahau para noticias y actualizaciones
- **Librería xahau js**: [https://www.npmjs.com/package/xahau](https://www.npmjs.com/package/xahau) La librería JavaScript que usamos en este curso para interactuar con la red

### Testnet vs Mainnet

Xahau tiene dos redes principales:

| Característica | Testnet | Mainnet |
|---|---|---|
| URL WebSocket | wss://xahau-test.net | wss://xahau.network |
| Token | XAH (sin valor real) | XAH (con valor real) |
| Propósito | Desarrollo y pruebas | Producción |
| Faucet | Sí (XAH gratis para probar) | No |
| Datos | Se pueden reiniciar periódicamente | Permanentes |

**Para este curso usaremos siempre la testnet.** Los tokens de testnet no tienen valor real, así que puedes experimentar libremente sin riesgo de perder dinero.

Para obtener XAH de testnet, usa el **faucet** (grifo): una herramienta que te envía tokens gratuitos a tu cuenta de prueba. Lo veremos en detalle en módulos posteriores.`,
        en: `Xahau is not just a blockchain, it is a **complete ecosystem** with tools, wallets, explorers, and an active community. In this lesson you will learn about the fundamental pieces of the ecosystem so you know where to find information and how to interact with the network.

### XAH: The Native Token

**XAH** is the native cryptocurrency of Xahau. Unlike XRP on XRPL, XAH has an **inflationary emission system**: holders of active accounts can request periodic rewards in XAH. This incentivizes participation in the network and its usage.

XAH characteristics:
- Used to pay **fees** (transaction fees)
- A **minimum reserve** is needed to maintain an active account
- The **emission system** distributes XAH to active accounts that request it
- It can be sent, exchanged, and used in Hooks

### Xaman (formerly XUMM): The Main Wallet

**Xaman** (formerly known as XUMM) is the most widely used wallet in the XRPL/Xahau ecosystem. It is a mobile application that allows you to:

- Create and manage accounts on Xahau and XRPL
- Send and receive XAH and tokens
- Sign transactions securely
- Interact with decentralized applications (xApps)
- Available for **iOS** and **Android**

Download: [xaman.app](https://xaman.app)

### Hooks Builder: Online IDE for Smart Contracts

**Hooks Builder** is an integrated development environment (IDE) that runs in the browser and allows you to write, compile, and deploy Hooks without installing anything on your computer on Xahau Testnet.

Features:
- Code editor with syntax highlighting for C
- Built-in C to WebAssembly compiler
- Direct deployment to the Xahau testnet
- Examples and templates to get started quickly

URL: [builder.xahau.network/](https://builder.xahau.network/)

### Block Explorers

**Explorers** allow you to visually see everything happening on the blockchain:

- Search transactions by hash
- View the state of any account (balance, tokens, hooks)
- Explore ledgers and their contents
- Verify the network status

For **Xahau Mainnet**:

URL: [xahauexplorer.com](https://xahauexplorer.com)
URL: [xahau.xrplwin.com](https://xahau.xrplwin.com)
URL: [explorer.xahau.network](https://explorer.xahau.network)
URL: [xahscan.com](https://xahscan.com)

For **Xahau Testnet**:

URL: [test.xahauexplorer.com](https://test.xahauexplorer.com)
URL: [xahau-testnet.xrplwin.com](https://xahau-testnet.xrplwin.com)
URL: [explorer.xahau-test.net](https://explorer.xahau-test.net)

### Developer Resources

- **Official documentation**: [xahau.network/docs/](https://xahau.network/docs/) Guides, API reference, and tutorials
- **GitHub**: [https://github.com/xahau](https://github.com/xahau) Node source code, libraries, and tools
- **Discord**: [https://discord.gg/ds7nb93mYj](https://discord.gg/ds7nb93mYj) Active community for asking questions and sharing projects
- **X**: [https://x.com/XahauNetwork](https://x.com/XahauNetwork) Official Xahau blockchain account for news and updates
- **xahau js library**: [https://www.npmjs.com/package/xahau](https://www.npmjs.com/package/xahau) The JavaScript library we use in this course to interact with the network

### Testnet vs Mainnet

Xahau has two main networks:

| Feature | Testnet | Mainnet |
|---|---|---|
| WebSocket URL | wss://xahau-test.net | wss://xahau.network |
| Token | XAH (no real value) | XAH (real value) |
| Purpose | Development and testing | Production |
| Faucet | Yes (free XAH for testing) | No |
| Data | Can be reset periodically | Permanent |

**For this course we will always use the testnet.** Testnet tokens have no real value, so you can experiment freely without the risk of losing money.

To obtain testnet XAH, use the **faucet**: a tool that sends free tokens to your test account. We will cover this in detail in later modules.`,
        jp: `Xahauは単なるブロックチェーンではなく、ツール、ウォレット、エクスプローラー、活発なコミュニティを備えた**完全なエコシステム**です。このレッスンでは、情報をどこで探すか、ネットワークとどのようにやりとりするかを知るために、エコシステムの基本的な要素を学びます。

### XAH：ネイティブトークン

**XAH**はXahauのネイティブ暗号通貨です。XRPLのXRPとは異なり、XAHにはアクティブなアカウントの保有者は定期的にXAHの報酬をリクエスト可能な**インフレ型エミッションシステム**があります。これによりネットワークへの参加と利用が奨励されます。

XAHの特徴：
- **手数料**（トランザクション手数料）の支払いに使用される
- アクティブなアカウントを維持するために**少額の準備金**が必要
- **エミッションシステム**がリクエストしたアクティブなアカウントにXAHを配布する
- 送信、交換、Hooksでの使用が可能

### Xaman（旧XUMM）：メインウォレット

**Xaman**（以前はXUMMとして知られていた）はXRPL/Xahauエコシステムで最も広く使用されているウォレットです。次のことが可能なモバイルアプリケーションです。

- XahauとXRPLのアカウントを作成・管理する
- XAHとトークンを送受信する
- トランザクションを安全に署名する
- 分散型アプリケーション（xApps）と連携する
- **iOS**と**Android**で利用可能

ダウンロード：[xaman.app](https://xaman.app)

### Hooks Builder：スマートコントラクト用オンラインIDE

**Hooks Builder**はブラウザで動作する統合開発環境（IDE）で、コンピュータに何もインストールせずにXahau Testnet上でHooksを書き、コンパイルし、デプロイできます。

特徴：
- C言語のシンタックスハイライト付きコードエディタ
- 組み込みのCからWebAssemblyへのコンパイラ
- Xahau testnetへの直接デプロイ
- すぐに始めるためのサンプルとテンプレート

URL：[builder.xahau.network/](https://builder.xahau.network/)

### ブロックエクスプローラー

**エクスプローラー**はブロックチェーン上で起きていることをすべて視覚的に確認できます。

- ハッシュでトランザクションを検索する
- 任意のアカウントの状態を確認する（残高、トークン、Hooks）
- レジャーとその内容を探索する
- ネットワークの状態を確認する

**Xahau Mainnet**の場合：

URL：[xahauexplorer.com](https://xahauexplorer.com)
URL：[xahau.xrplwin.com](https://xahau.xrplwin.com)
URL：[explorer.xahau.network](https://explorer.xahau.network)
URL：[xahscan.com](https://xahscan.com)

**Xahau Testnet**の場合：

URL：[test.xahauexplorer.com](https://test.xahauexplorer.com)
URL：[xahau-testnet.xrplwin.com](https://xahau-testnet.xrplwin.com)
URL：[explorer.xahau-test.net](https://explorer.xahau-test.net)

### 開発者向けリソース

- **公式ドキュメント**：[xahau.network/docs/](https://xahau.network/docs/) ガイド、APIリファレンス、チュートリアル
- **GitHub**：[https://github.com/xahau](https://github.com/xahau) ノードのソースコード、ライブラリ、ツール
- **Discord**：[https://discord.gg/ds7nb93mYj](https://discord.gg/ds7nb93mYj) 質問やプロジェクト共有のための活発なコミュニティ
- **X**：[https://x.com/XahauNetwork](https://x.com/XahauNetwork) ニュースとアップデートのためのXahauブロックチェーン公式アカウント
- **xahau jsライブラリ**：[https://www.npmjs.com/package/xahau](https://www.npmjs.com/package/xahau) このコースでネットワークと連携するために使用するJavaScriptライブラリ

### TestnetとMainnet

Xahauには2つの主要なネットワークがあります：

| 特徴 | Testnet | Mainnet |
|---|---|---|
| WebSocket URL | wss://xahau-test.net | wss://xahau.network |
| トークン | XAH（実際の価値なし） | XAH（実際の価値あり） |
| 目的 | 開発とテスト | 本番環境 |
| faucet | あり（テスト用の無料XAH） | なし |
| データ | 定期的にリセットされる場合がある | 永続的 |

**このコースでは常にtestnetを使用します。** Testnetのトークンには実際の価値がないため、お金を失うリスクなく自由に実験できます。

Testnet XAHを取得するには、**faucet**（テストアカウントにテスト用トークンを送るツール）を使用します。これは後のモジュールで詳しく説明します。`,
        ko: `Xahau는 단순한 블록체인이 아니라 **도구, 지갑, 익스플로러, 커뮤니티**를 포함한 완전한 생태계입니다. 이 레슨에서는 정보를 어디서 찾고 네트워크와 어떻게 상호작용할지 이해하기 위한 핵심 요소를 살펴봅니다.

### XAH: 네이티브 토큰

**XAH**는 Xahau의 네이티브 암호화폐입니다. XRPL의 XRP와 달리 XAH는 **인플레이션형 발행 시스템**을 가지며, 활성 계정은 주기적인 보상을 요청할 수 있습니다.

XAH의 특징:
- **수수료** 지불에 사용
- 계정 유지에 **최소 준비금** 필요
- 발행 시스템이 활성 계정에 XAH를 분배
- 전송, 교환, Hooks에서 사용 가능

### Xaman (구 XUMM): 대표 지갑

**Xaman**은 XRPL/Xahau 생태계에서 가장 널리 사용되는 모바일 지갑입니다.

- Xahau와 XRPL 계정 생성/관리
- XAH와 토큰 송수신
- 안전한 트랜잭션 서명
- xApps와 상호작용
- **iOS** 및 **Android** 지원

다운로드: [xaman.app](https://xaman.app)

### Hooks Builder: 스마트 컨트랙트용 온라인 IDE

**Hooks Builder**는 브라우저에서 동작하는 개발 환경으로, Xahau Testnet에서 Hook을 작성, 컴파일, 배포할 수 있습니다.

특징:
- C 문법 하이라이트 에디터
- C → WebAssembly 컴파일러 내장
- Xahau testnet 직접 배포
- 빠르게 시작할 수 있는 예제와 템플릿

URL: [builder.xahau.network/](https://builder.xahau.network/)

### 블록 익스플로러

익스플로러를 사용하면 블록체인에서 벌어지는 일을 시각적으로 확인할 수 있습니다:

- 해시로 트랜잭션 검색
- 계정 상태 확인 (잔액, 토큰, Hooks)
- 레저와 그 내용 탐색
- 네트워크 상태 점검

### 개발자 리소스

- **공식 문서**: [xahau.network/docs/](https://xahau.network/docs/)
- **GitHub**: [https://github.com/xahau](https://github.com/xahau)
- **Discord**: [https://discord.gg/ds7nb93mYj](https://discord.gg/ds7nb93mYj)
- **X**: [https://x.com/XahauNetwork](https://x.com/XahauNetwork)
- **xahau js 라이브러리**: [https://www.npmjs.com/package/xahau](https://www.npmjs.com/package/xahau)

### Testnet vs Mainnet

| 특징 | Testnet | Mainnet |
|---|---|---|
| WebSocket URL | wss://xahau-test.net | wss://xahau.network |
| 토큰 | XAH (실제 가치 없음) | XAH (실제 가치 있음) |
| 목적 | 개발/테스트 | 운영 |
| Faucet | 있음 | 없음 |
| 데이터 | 주기적으로 초기화될 수 있음 | 영구적 |

**이 강좌에서는 항상 testnet을 사용합니다.** Testnet 토큰은 실제 가치가 없으므로 자유롭게 실험할 수 있습니다.

테스트용 XAH가 필요하면 **faucet**을 사용하세요. 이후 모듈에서 자세히 다룹니다.`,
      },
      codeBlocks: [
      ],
      slides: [
        {
          title: { es: "XAH y el sistema de emisiones", en: "XAH and the Emission System", jp: "XAHとエミッションシステム", ko: "XAH와 발행 시스템" },
          content: {
            es: "XAH = Token nativo de Xahau\n\n• Pagar fees (comisiones)\n• Reserva mínima para cuentas\n• Sistema de emisión inflaccionario\n  → Los usuarios que lo soliciten, reciben XAH periódicamente",
            en: "XAH = Native token of Xahau\n\n• Pay fees (transaction fees)\n• Minimum reserve for accounts\n• Inflationary emission system\n  → Users who request it receive XAH periodically",
            jp: "XAH = Xahauのネイティブトークン\n\n• 手数料（取引手数料）の支払い\n• アカウントの最小リザーブ\n• インフレ型エミッションシステム\n  → リクエストしたユーザーは定期的にXAHを受け取る",
            ko: "XAH = Xahau의 네이티브 토큰\n\n• 수수료 지불\n• 계정 최소 준비금\n• 인플레이션형 발행 시스템\n  → 요청한 사용자는 주기적으로 XAH를 받음",
          },
          visual: "💰",
        },
        {
          title: { es: "Herramientas del ecosistema", en: "Ecosystem Tools", jp: "エコシステムツール", ko: "생태계 도구" },
          content: {
            es: "Xaman → Wallet móvil (iOS/Android)\n  xaman.app\n\nHooks Builder → IDE online para smart contracts\n  builder.xahau.network\n\nExplorer → Exploradores de bloques\n  xahauexplorer.com xahau.xrplwin.com xahscan.com\n\nDocs → Documentación oficial\n  xahau.network/docs",
            en: "Xaman → Mobile wallet (iOS/Android)\n  xaman.app\n\nHooks Builder → Online IDE for smart contracts\n  builder.xahau.network\n\nExplorer → Block explorers\n  xahauexplorer.com xahau.xrplwin.com xahscan.com\n\nDocs → Official documentation\n  xahau.network/docs",
            jp: "Xaman → モバイルウォレット（iOS/Android）\n  xaman.app\n\nHooks Builder → スマートコントラクト用オンラインIDE\n  builder.xahau.network\n\nエクスプローラー → ブロックエクスプローラー\n  xahauexplorer.com xahau.xrplwin.com xahscan.com\n\nDocs → 公式ドキュメント\n  xahau.network/docs",
            ko: "Xaman → 모바일 지갑 (iOS/Android)\n  xaman.app\n\nHooks Builder → 스마트 컨트랙트용 온라인 IDE\n  builder.xahau.network\n\nExplorer → 블록 익스플로러\n  xahauexplorer.com xahau.xrplwin.com xahscan.com\n\nDocs → 공식 문서\n  xahau.network/docs",
          },
          visual: "🛠️",
        },
        {
          title: { es: "Testnet vs Mainnet", en: "Testnet vs Mainnet", jp: "Testnet vs Mainnet", ko: "Testnet vs Mainnet" },
          content: {
            es: "Testnet (desarrollo)\n• wss://xahau-test.net\n• XAH sin valor real\n• Faucet para obtener tokens gratis\n\nMainnet (producción)\n• wss://xahau.network\n• XAH con valor real\n• Sin faucet\n\nEn este curso usamos SIEMPRE testnet",
            en: "Testnet (development)\n• wss://xahau-test.net\n• XAH with no real value\n• Faucet to get free tokens\n\nMainnet (production)\n• wss://xahau.network\n• XAH with real value\n• No faucet\n\nIn this course we ALWAYS use testnet",
            jp: "Testnet（開発）\n• wss://xahau-test.net\n• 実際の価値のないXAH\n• 無料トークンを取得するフォーセット\n\nMainnet（本番）\n• wss://xahau.network\n• 実際の価値のあるXAH\n• フォーセットなし\n\nこのコースでは常にtestnetを使用する",
            ko: "Testnet (개발)\n• wss://xahau-test.net\n• 실제 가치 없는 XAH\n• 무료 토큰용 faucet 제공\n\nMainnet (운영)\n• wss://xahau.network\n• 실제 가치 있는 XAH\n• faucet 없음\n\n이 강좌에서는 항상 testnet 사용",
          },
          visual: "🌐",
        },
      ],
    },
  ],
}
