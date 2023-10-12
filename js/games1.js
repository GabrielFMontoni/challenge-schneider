const login = JSON.parse(localStorage.getItem("loginAtual"));






// array com uma sequencia de objetos que representam uma questão cada
const questionsList = [{
        questionList: 'Quando o assunto é coleta seletiva, temos várias cores diferentes de lixeira. Qual a cor da lixeira do plástico?',
        options: ['A: Azul', 'B: Verde', 'C: Vermelho', 'D: Cinza'],
        correctAnswer: 'C'
    },
    {
        questionList: 'Qual das opções não é uma energia renovável?',
        options: ['A: Gás Natural', 'B: Eólica', 'C: Solar', 'D: Hídrica'],
        correctAnswer: 'A'
    },
    {
        questionList: 'O que é sustentabilidade?',
        options: ['A: Uma fonte de energia renovável.', 'B: A capacidade de manter ou preservar recursos para gerações futuras.', 'C: A exploração irresponsável dos recursos naturais.', 'D:  Um tipo de agricultura intensiva'],
        correctAnswer: 'B'
    },
    {
        questionList: 'Qual é a principal causa do aquecimento global?',
        options: ['A: Emissões de gases de efeito estufa.', 'B: Consumo excessivo de carne.', 'C: Uso de plástico.', 'D: Derrubada de florestas tropicais.'],
        correctAnswer: 'A'
    },
    {
        questionList: 'O que é agricultura sustentável?',
        options: ['A: Uso intensivo de pesticidas e fertilizantes.','B: Uso de sementes geneticamente modificadas','C: Práticas agrícolas que protegem o meio ambiente e conservam recursos.','D: Plantio de monoculturas em larga escala'],
        correctAnswer: 'C'
    },
    {
        questionList: 'O que são energias renováveis?',
        options: ['A: Energias provenientes de fontes minerais.', 'B: Energias produzidas a partir da queima de combustíveis fósseis.', 'C: Energias que não causam impactos ambientais', 'D: Energias obtidas de fontes naturais que se renovam constantemente.'],
        correctAnswer: 'D'
    },
    {
        questionList: 'Qual é o impacto da poluição do ar na saúde humana?',
        options: ['A: Menor insidencia de raios solares.','B: Aumento de doenças autoimunes.','C: Aumento de problemas respiratórios e cardiovasculares.','D: Aumento de problemas de pele'],
        correctAnswer: 'C'
    },
    {
        questionList: 'Quais desses gases é menos prejudicial para a atmosfera?',
        options: ['A: Dioxido de carbono (CO2).', 'B: Metano (CH4).', 'C: Óxido nitroso (N2O).', 'D: Dióxido de Nitrogênio (NO2).'],
        correctAnswer: 'A'
    },
    {
        questionList: 'Em que ano foi publicado o relatório "Nosso Futuro Comum" (também conhecido como Relatório Brundtland), pela Comissão Mundial sobre Meio Ambiente e Desenvolvimento das Nações Unidas?',
        options: ['A:1987.', 'B: 2000.', 'C: 1991.', 'D: 2015.'],
        correctAnswer: 'A'
    },
    {
        questionList: 'Protocolo de ____ . Qual cidade leva o nome de um acordo global para a redução das emissões de gases de efeito estufa.?',
        options: ['A: Turim.', 'B: Damasco.', 'C: Kyoto.', 'D: Xangai.'],
        correctAnswer: 'C'
    },
    {
        questionList: 'Qual o maior poluente dos oceanos?',
        options: ['A: Petróleo.', 'B: Plástico.', 'C: Metais Pesados.', 'D: Resíduos Industriais.'],
        correctAnswer: 'B'
    },
    {
        questionList: 'Qual o nome da primeira mulher a ser presidente de um país no mundo?',
        options: ['A: Ellen Johnson Sirleaf (Libéria).', 'B: Corazon Aquino (Filipinas).', 'C: Indira Gandhi (Índia).', 'D: DVigdís Finnbogadóttir (Finlândia).'],
        correctAnswer: 'D'
    },
    {
        questionList: 'Por que os veículos elétricos não podem ser considerados 100% livres de emissões de gases prejudiciais para o meio ambiente?',
        options: ['A: Porque dependem de materiais que poluem o meio ambiente.', 'B: Porque emitem, mesmo que pouco, residuos de óxidos de nitrogênio.', 'C: Porque ainda não existem carros 100% elétricos, apenas híbridos.', 'D: Porque as fontes de energia elétrica ainda não são 100% limpas.'],
        correctAnswer: 'A'
    },
    {
        questionList: 'Em qual cidade foi criada em 1992 a Convenção sobre Diversidade Biológica (CDB), que busca a conservação da biodiversidade, o uso sustentável de recursos biológicos e a distribuição justa e equitativa dos benefícios decorrentes de recursos genéticos.?',
        options: ['A: Paris.', 'B: Buenos Aires.', 'C: Cidade do México.', 'D: Rio de Janeiro.'],
        correctAnswer: 'D'
    },
    {
        questionList: 'Qual cidade canadense leva o nome do Protocolo Adotado em 1987, com o objetivo de proteger a camada de ozônio, regulamentando a produção e consumo de substâncias que depletam o ozônio, como os CFCs?',
        options: ['A: Ottawa.', 'B: Montreal.', 'C: Vancouver.', 'D: Toronto.'],
        correctAnswer: 'B'
    },

    // Para adicionar novas questões, use o padrão:
    // {
    //     questionList: -- pergunta ,
    //     options: [] -- alternativas,
    //     correctAnswer -- resposta:

    // },
];

let currentQuestionIndex = 0;
let score = 0;
let count = 14; // se for adicionar mais que 15 questões, alterar a variavel count para n - 1, onde n é o numero de questões. 

const questionElement = document.getElementById('question');
const optionsElements = document.querySelectorAll('.option');

function displayQuestion() {
    if (currentQuestionIndex < questionsList.length) {
        const question = questionsList[currentQuestionIndex];
        questionElement.innerText = question.questionList;

        for (let i = 0; i < 4; i++) {
            optionsElements[i].innerText = question.options[i];
        }
    } else {
        endQuiz();
    }
}

function checkAnswer(selectedOption) {
    const question = questionsList[currentQuestionIndex];
    const selectedAnswer = selectedOption.innerText[0];
    const prizeList = [...document.querySelectorAll('.prize')]


    if (selectedAnswer === question.correctAnswer[0]) {
        selectedOption.classList.add('true');
        prizeList[0].children[count].classList.add('win')
        score++;
        count--;
    } else {

        selectedOption.classList.add('false');
    }

    setTimeout(() => {
        selectedOption.classList.remove('true', 'false');
        currentQuestionIndex++;
        displayQuestion();
    }, 1000);

    
}
function premio (valor) {
    switch (valor){
    case 1:
        return "R$1,000";
    case 2:
        return "R$2,000";
    case 3:
        return "R$3,000";
    case 4:
        return "R$4,000";
    case 5:
        return "R$5,000";S
    case 6:
        return "R$10,000";
    case 7:
        return "R$20,000";
    case 8:
        return "R$30,000";
    case 9:
        return "R$40,000";
    case 10:
        return "R$50,000";
    case 11:
        return "R$100,000";
    case 12:
        return "R$250,000";
    case 13:
        return "R$500,000";
    case 14:
        return "R$750,000";
    case 15:
        return "R$1,000,000";
    default:
        return "R$0,00";

    }    
}
function endQuiz() {

    const quizContainer = document.querySelector('.questions');
    const premioValor = premio(score);
    quizContainer.innerHTML = `
    <h1>Quiz Concluído!</h1>
    <p>Sua pontuação: ${score} de ${questionsList.length}</p>
    <p>O seu prêmio foi de ${premioValor}</p>
    `;
    quizContainer.style.color = '#fff';
    
    
    login[0].userPoints += score;
    
    localStorage.setItem("loginAtual", JSON.stringify(login));

}

optionsElements.forEach(option => {
    option.addEventListener('click', () => {
        checkAnswer(option);

    });
});



displayQuestion();

