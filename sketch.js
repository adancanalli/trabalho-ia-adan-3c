document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const questionText = document.getElementById('question-text');
    const btnYes = document.getElementById('btn-yes');
    const btnNo = document.getElementById('btn-no');
    const btnRestart = document.getElementById('btn-restart');
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    const missionFeedback = document.getElementById('mission-feedback');
    const questionContainer = document.getElementById('question-container');
    const missionResult = document.getElementById('mission-result');
    const resultMessage = document.getElementById('result-message');
    const resultTitle = document.getElementById('result-title');

    // Perguntas da missão atualizadas
    const questions = [
        {
            question: "Você acha que a IA generativa (como ChatGPT) vai substituir trabalhos criativos?",
            feedback: {
                yes: "É uma preocupação válida, mas talvez a IA possa colaborar em vez de substituir.",
                no: "Você acredita no valor único da criatividade humana!"
            }
        },
        {
            question: "A IA deve ser regulamentada por governos para evitar riscos?",
            feedback: {
                yes: "Regulação responsável pode ajudar a guiar o desenvolvimento seguro da IA.",
                no: "Muita regulamentação pode atrapalhar a inovação. Visão interessante!"
            }
        },
        {
            question: "Você usaria um assistente de IA para tomar decisões importantes na sua vida?",
            feedback: {
                yes: "A IA pode oferecer insights valiosos para decisões complexas!",
                no: "Você valoriza o julgamento humano acima das recomendações de máquinas."
            }
        },
        {
            question: "A IA representa mais oportunidades do que riscos para a sociedade?",
            feedback: {
                yes: "Otimista! A IA certamente tem potencial para resolver grandes problemas.",
                no: "Você está atento aos possíveis perigos da tecnologia avançada."
            }
        },
        {
            question: "Você acha que a IA eventualmente desenvolverá emoções genuínas?",
            feedback: {
                yes: "Fascinante! A natureza da consciência ainda é um mistério.",
                no: "Você vê emoções como algo exclusivamente biológico."
            }
        }
    ];

    // Estado da missão
    let currentQuestion = 0;
    let answers = [];
    let missionComplete = false;

    // Inicializar missão
    function initMission() {
        currentQuestion = 0;
        answers = [];
        missionComplete = false;
        questionContainer.style.display = 'block';
        missionResult.style.display = 'none';
        missionFeedback.textContent = '';
        updateProgress();
        showQuestion();
    }

    // Mostrar pergunta atual
    function showQuestion() {
        if (currentQuestion < questions.length) {
            questionText.textContent = questions[currentQuestion].question;
        } else {
            completeMission();
        }
    }

    // Atualizar barra de progresso
    function updateProgress() {
        const progress = (currentQuestion / questions.length) * 100;
        progressBar.style.width = ${progress}%;
        progressText.textContent = ${Math.round(progress)}% completo;
    }

    // Lidar com resposta
    function handleAnswer(answer) {
        if (missionComplete) return;
        
        const feedback = answer ? 
            questions[currentQuestion].feedback.yes : 
            questions[currentQuestion].feedback.no;
        
        answers.push({
            question: questions[currentQuestion].question,
            answer: answer ? 'Sim' : 'Não',
            feedback: feedback
        });
        
        missionFeedback.textContent = feedback;
        currentQuestion++;
        updateProgress();
        
        // Pequeno atraso antes de mostrar a próxima pergunta
        setTimeout(() => {
            missionFeedback.textContent = '';
            showQuestion();
        }, 1500);
    }

    // Concluir missão
    function completeMission() {
        missionComplete = true;
        questionContainer.style.display = 'none';
        missionResult.style.display = 'block';
        
        // Analisar respostas
        const yesCount = answers.filter(a => a.answer === 'Sim').length;
        const noCount = answers.filter(a => a.answer === 'Não').length;
        
        resultTitle.textContent = "Missão Concluída!";
        
        if (yesCount > noCount) {
            resultMessage.textContent = Você é otimista sobre IA! Respondeu "Sim" a ${yesCount} de ${questions.length} perguntas. A IA tem um grande potencial e você reconhece isso.;
        } else if (noCount > yesCount) {
            resultMessage.textContent = Você é cauteloso com a IA! Respondeu "Não" a ${noCount} de ${questions.length} perguntas. Sua prudência é importante para o desenvolvimento responsável da tecnologia.;
        } else {
            resultMessage.textContent = Você tem uma visão equilibrada sobre IA! Respondeu igualmente "Sim" e "Não". Manter o equilíbrio é crucial nesse campo em rápida evolução.;
        }
    }

    // Event listeners
    btnYes.addEventListener('click', () => handleAnswer(true));
    btnNo.addEventListener('click', () => handleAnswer(false));
    btnRestart.addEventListener('click', initMission);

    // Iniciar a missão
    initMission();
});