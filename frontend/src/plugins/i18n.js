import Vue from "vue";
import VueI18n from "vue-i18n";
Vue.use(VueI18n);

const messages = {
    en: {
        recipes: "recipes",
        favourites: "favourites",
        home: "home",
        myRecipes: "my recipes",
        myProfile: "my profile",
        changeLanguage: "change language",
        logout: "Logout",
        login: "Login",
        createANewRecipe: "Create a new recipe",
        name: "Name",
        surname: "Surname",
        save: "Save",
        uploadImage: "Upload image",
        loginTitle: "Login",
        password: "Password",
        iDontHaveAccount: "I don't have an account",
        signupTitle: "Signup",
        passwordConfirm: "Confirm your password",
        iHaveAccount: "I have an account already",
        signup: "Sign up",
        checkOut: "Check out",
        theFinalWillFit: "The final cover image will perfectly fit the tile.",
        easy: "easy",
        medium: "medium",
        difficult: "difficult",
        ingredients: "ingredients",
        optional: "optional",
        recipe: "recipe",
        viewStepper: "View a stepper",
        viewFullRecipe: "View a full recipe",
        optionalStep: "Optional step",
        previous: "Previous",
        next: "Next",
        finish: "Finish",
        beforeStart: "Before you start",
        step: "Step",
        sendAReview: "Send a review",
        writeAReview: "Write a short review...",
        reviews: "Reviews",
        countdown: "Countdown",
        specifyIngredients: "Specify the ingredients",
        ingredient: "Ingredient",
        untitled: "Untitled",
        ingredientHint: "Point out the ingredient and amount",
        servingHint: "Eg. for 2 people / 5 pieces / 2 liters of juice",
        numberOfServings: "Number of servings",
        add: "Add",
        set: "Set",
        provideInfo: "Provide essential information",
        writeDescription: "Write a short description",
        preparationTime: "Preparation time in minutes",
        descriptionHint: "It will be visible in the recipes list",
        selectDifficulty: "Select recipe's difficulty",
        applyIngredients: "Apply the ingredients",
        applyDescription: "Apply the description",
        stepper: "Stepper",
        beforeStartInput: "Specify necessary preparations for this step",
        beforeStartHint:
            "Eg. Prepare two big bowls and connect a mixer to the power supply.",
        writeInstruction: "Write a instruction for this step",
        countdownTimer: "Countdown timer",
        durationTime: "Duration time in minutes",
        countdownHint:
            "Specify if there is a break between current and next step(eg. baking in the oven)",
        isStepOptional: "Is this step optional?",
        addStep: "Add this step",
        summary: "Summary",
        steps: "Steps",
        publish: "Publish my recipe",
        deleteRecipe: "Delete recipe",
        accept: "Accept",
        cancel: "Cancel",
        pop1: "Nice to see you again",
        pop2: "New photo has been uploaded!",
        pop3: "Your profile has been updated!",
        pop4: "has been added to your favourites!",
        pop5: "has been removed from your favourites!",
        pop6: "You have been logged out!",
        alertTitle1: "Something went wrong...",
        alertTitle2: "Error",
        alertTitle3: "Excellent!",
        alertTitle4: "Invalid duration time",
        alertTitle5: "Unspecified steps...",
        alertTitle6: "Success",
        alertTitle7: "Step finished",
        alertTitle8: "Deleting the recipe",
        alertContent1: "Invalid email or password!",
        alertContent2: "Please fill empty fields!",
        alertContent3:
            "There is a problem with the server... Please try to login later!",
        alertContent4: "Please provide valid data!",
        alertContent5:
            "There is a problem with the server... Please try to sign up later!",
        alertContent6p1: "The field",
        alertContent6p2: "must have more or equal",
        alertContent6p3: "characters!",
        alertContent7: "You have to be logged in to post a review!",
        alertContent8: "Your review has been posted below this recipe!",
        alertContent9: "Please specify duration time as number of minutes.",
        alertContent10: "Please create steps to publish this recipe.",
        alertContent11: "Your recipe has been created!",
        alertContent12:
            "There is a problem with the server... Please try again later!",
        alertContent13: "have passed. You can go ahead to the next step.",
        alertContent14: "Review has been deleted successfully.",
        alertContent15: "Do you want to delete this recipe?",
        alertContent16: "The recipe has been successfully deleted.",
        validateTitle1: "Recipe is untitled...",
        validateContent1: "Please provide recipe's title by clicking it.",
        validateTitle2: "Empty ingredients list",
        validateContent2: "Please add necessary ingredients.",
        validateTitle3: "Unspecified number of servings",
        validateContent3: "Please set amount of portions.",
        validateTitle4: "The description is empty",
        validateContent4: "Please provide recipe's description.",
        validateTitle5: "Invalid preparation time",
        validateContent5:
            "Please specify preparation time as number of minutes.",
        validateTitle6: "Unspecified recipe's difficulty",
        validateContent6: "Please select recipe's difficulty."
    },
    pl: {
        recipes: "przepisy",
        favourites: "ulubione",
        home: "strona główna",
        myRecipes: "moje przepisy",
        myProfile: "mój profil",
        changeLanguage: "zmień język",
        logout: "Wyloguj",
        login: "Zaloguj",
        createANewRecipe: "Stwórz nowy przepis",
        name: "Imię",
        surname: "Nazwisko",
        save: "Zapisz",
        uploadImage: "Wybierz zdjęcie",
        loginTitle: "Logowanie",
        password: "Hasło",
        iDontHaveAccount: "Nie mam założonego konta",
        signupTitle: "Rejestracja",
        passwordConfirm: "Potwierdź hasło",
        iHaveAccount: "Mam już konto",
        signup: "Zarejestruj się",
        checkOut: "Otwórz",
        theFinalWillFit:
            "Zdjęcie przepisu zostanie idealnie dopasowane do ramki.",
        easy: "łatwy",
        medium: "średni",
        difficult: "trudny",
        ingredients: "składniki",
        optional: "opcjonalnie",
        recipe: "przepis",
        viewStepper: "Krok po kroku",
        viewFullRecipe: "Pokaż cały przepis",
        optionalStep: "Krok opcjonalny",
        previous: "Powrót",
        next: "Dalej",
        finish: "Zakończ",
        beforeStart: "Zanim zaczniemy",
        step: "Krok",
        sendAReview: "Prześlij opinię",
        writeAReview: "Napisz krótką opinię...",
        reviews: "Opinie",
        countdown: "Odliczaj",
        specifyIngredients: "Wprowadź wszystkie składniki",
        ingredient: "Składnik",
        untitled: "Brak tytułu",
        ingredientHint: "Wskaż składnik wraz z ilością",
        servingHint: "np. dla 2 osób / 5 sztuk / 2 litry soku",
        numberOfServings: "Liczba porcji",
        add: "Dodaj",
        set: "Ustaw",
        provideInfo: "Podaj niezbędne informacje",
        writeDescription: "Napisz krótki opis",
        preparationTime: "Czas przygotowania w minutach",
        descriptionHint: "Będzie on widoczny na liście przepisów",
        selectDifficulty: "Wybierz trudność przepisu",
        applyIngredients: "Zatwierdź składniki",
        applyDescription: "Zatwierdź opis",
        stepper: "Krok po kroku",
        beforeStartInput: "Sprecyzuj niezbędne przygotowania przed tym krokiem",
        beforeStartHint: "np. Przygotuj dwie miski i podłącz mikser do prądu.",
        writeInstruction: "Napisz instrukcje do wykonania w tym kroku",
        countdownTimer: "Licznik czasu",
        durationTime: "Czas do odliczenia w minutach",
        countdownHint:
            "Wpisz jeśli ten krok wymaga odczekania (np. pieczenie w piekarniku)",
        isStepOptional: "Czy to krok opcjonalny?",
        addStep: "Dodaj krok",
        summary: "Podsumowanie",
        steps: "Podane kroki",
        publish: "Opublikuj mój przepis",
        deleteRecipe: "Usuń przepis",
        accept: "Zatwierdź",
        cancel: "Anuluj",
        pop1: "Miło Cię znów widzieć ",
        pop2: "Nowe zdjęcie zostało dodane!",
        pop3: "Twój profil został zaktualizowany!",
        pop4: "został dodany do ulubionych!",
        pop5: "został usunięty z ulubionych!",
        pop6: "Wylogowano pomyślnie!",
        alertTitle1: "Coś poszło nie tak...",
        alertTitle2: "Błąd",
        alertTitle3: "Świetnie!",
        alertTitle4: "Nieprawidłowy czas trwania",
        alertTitle5: "Kroki nie zostały określone...",
        alertTitle6: "Sukces",
        alertTitle7: "Krok ukończony",
        alertTitle8: "Usuwanie przepisu",
        alertContent1: "Nieprawidłowy email lub hasło!",
        alertContent2: "Proszę wypełnić puste pola!",
        alertContent3:
            "Wystąpił problem z serwerem... Spróbuj zalogować się później!",
        alertContent4: "Proszę wprowadzić prawidłowe dane!",
        alertContent5:
            "Wystąpił problem z serwerem... Spróbuj zarejestrować się później!",
        alertContent6p1: "Pole",
        alertContent6p2: "musi mieć co najmniej",
        alertContent6p3: "znaków!",
        alertContent7: "Musisz być zalogowany, aby wystawić opinię!",
        alertContent8: "Twoja opinia została zamieszczona pod przepisem!",
        alertContent9: "Prosze sprecyzować czas trwania jako ilość minut.",
        alertContent10: "Proszę stworzyć kroki aby opublikować przepis.",
        alertContent11: "Przepis został opublikowany!",
        alertContent12:
            "Wystąpił problem z serwerem... Spróbuj ponownie później!",
        alertContent13: "minęło. Możesz przejść do kolejnego kroku.",
        alertContent14: "Pomyślnie usunięto opinię.",
        alertContent15: "Czy na pewno chcesz usunąć ten przepis?",
        alertContent16: "Pomyślnie usunięto ten przepis.",
        validateTitle1: "Przepis nie ma tytułu...",
        validateContent1: "Proszę wprowadzić tytuł klikając go.",
        validateTitle2: "Lista składników jest pusta",
        validateContent2: "Prosze dodać niezbędne składniki.",
        validateTitle3: "Ilość porcji nie została podana",
        validateContent3: "Proszę podać ilość porcji.",
        validateTitle4: "Opis jest pusty",
        validateContent4: "Proszę podać opis przepisu.",
        validateTitle5: "Nieprawidłowy czas przygotowania",
        validateContent5:
            "Proszę wprowadzić czas przygotowania jako ilość minut.",
        validateTitle6: "Stopień trudności nie został wybrany",
        validateContent6: "Proszę wybrać stopień trudności przepisu."
    }
};

export default new VueI18n({
    locale: "en", // set locale
    fallbackLocale: "pl", // set fallback locale
    messages // set locale messages
});
