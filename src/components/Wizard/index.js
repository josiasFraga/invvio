import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  forwardRef,
} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Keyboard,
  Platform,
  UIManager,
  findNodeHandle,
  InteractionManager,
} from 'react-native';
import PagerView from 'react-native-pager-view';
import { useFormik, FormikProvider } from 'formik';
import { useTheme } from '@rneui/themed';
import ConfirmButton from '@components/Buttons/ConfirmButton';
import SecondaryButton from '@components/Buttons/SecondaryButton';
import AppText from '@components/Typography/AppText';
import globalStyles from '@styles/globalStyles';
import ProgressBar from '@components/ProgressBar';

const Wizard = forwardRef(
  (
    {
      steps = [],
      initialValues = {},
      validationSchemas = [],
      onSubmit,
      onFinish,
      formik: externalFormik,
    },
    ref,
  ) => {
    const { theme } = useTheme();

    // Referências dos ScrollViews para cada página:
    const scrollViewsRef = useRef([]);

    // Objeto para associar cada campo de formulário a sua página e ref
    const fieldRefs = useRef({});

    const registerFieldRef = (fieldName, pageIndex, fieldRef) => {
      fieldRefs.current[fieldName] = { pageIndex, fieldRef };
    };

    const scrollToFieldByName = (fieldName) => {
      const info = fieldRefs.current[fieldName];
      if (info) {
        const { pageIndex, fieldRef } = info;
        scrollToField(fieldRef, pageIndex);
      }
    };

    const setFocusToFieldName = (fieldName) => {
      const info = fieldRefs.current[fieldName];
      if (info) {
        const { fieldRef } = info;
        fieldRef.focus();
      }
    };

    const scrollToField = (inputRef, pageIndex) => {
      const scrollRef = scrollViewsRef.current[pageIndex];
      if (!inputRef || !scrollRef) return;
      UIManager.measureLayout(
        findNodeHandle(inputRef),
        findNodeHandle(scrollRef.getInnerViewNode()),
        (err) => console.log('Erro measureLayout', err),
        (x, y) => scrollRef.scrollTo({ y: y - 20, animated: true }),
      );
    };

    const styles = useMemo(() => makeStyles(theme), [theme]);
    const GlobalStyle = useMemo(() => globalStyles(theme), [theme]);
    const pagerRef = useRef(null);
    const [currentStep, setCurrentStep] = useState(0);
    const [keyboardHeight, setKeyboardHeight] = useState(0);

    const totalSteps = steps.length;
    const isLastStep = currentStep === totalSteps - 1;

    const internalFormik = useFormik({
      initialValues,
      onSubmit: (values, {setSubmitting}) => {
        if (onSubmit) {
          onSubmit(values);
        } else if (onFinish) {
          onFinish(values);
          setSubmitting(false);
        }
      },

      validateOnBlur: false,
      validateOnChange: false,
    });
    const formik = externalFormik || internalFormik;

    const validateStep = useCallback(async () => {
      const schema = validationSchemas[currentStep];
      const additionalValidationStep = steps[currentStep]?.additionalValidationStep;
      
      if (!schema && !additionalValidationStep) return true;

      if (additionalValidationStep) {
        const isInValid = !additionalValidationStep.condition;
        if (!isInValid) {
          additionalValidationStep.onValidationError();
          return false;
        }
      }

      if (!schema) return true;

      try {
        await schema.validate(formik.values, { abortEarly: false });
        return true;
      } catch (err) {
        if (err.inner) {
          err.inner.forEach(e => {
            formik.setFieldError(e.path, e.message);
            formik.setFieldTouched(e.path, true, false);
          });
          const firstError = err.inner[0];
          if (firstError?.path) {
            scrollToFieldByName(firstError.path);
          }
        }
        return false;
      }
    }, [currentStep, validationSchemas, formik, steps]);

    const goToStep = useCallback((stepIdx) => {
      pagerRef.current?.setPage(stepIdx);
      setCurrentStep(stepIdx);
    }, []);

    const next = useCallback(async () => {
        const isValid = await validateStep();
        if (!isValid) return;

        const step = steps[currentStep];
        if (typeof step.beforeNext === 'function') {
          const proceed = await step.beforeNext(); // true/undefined → continua
          if (proceed === false) return;           // bloqueia avanço
        }

        goToStep(currentStep + 1);
    }, [validateStep, goToStep, currentStep]);

    const back = useCallback(() => goToStep(currentStep - 1), [goToStep, currentStep]);

    const finish = useCallback(async () => {
      if (await validateStep()) {
        formik.handleSubmit();
      }
    }, [validateStep, formik]);

    React.useImperativeHandle(ref, () => ({
      next,
      back,
      finish,
      goToStep,
    }));

    // --- Nova estratégia de cache usando chave única ---
    // Usaremos um objeto onde a chave é derivada de step.id, step.title ou o índice
    const stepCacheRef = useRef({});

    // Atualiza o cache quando os steps mudam: preserva somente os keys que ainda existem
    useEffect(() => {
      const newCache = {};
      steps.forEach((step, idx) => {
        const key = step.id || step.title || idx;
        if (stepCacheRef.current[key]) {
          newCache[key] = stepCacheRef.current[key];
        }
      });
      stepCacheRef.current = newCache;
    }, [steps.map(step => step.id || step.title).join(',')]);

    const renderStep = useCallback(
      (step, idx) => {
        // Define uma chave única para cada etapa
        const key = step.id || step.title || idx;
        if (React.isValidElement(step.component)) return step.component;
        if (!stepCacheRef.current[key]) {
          stepCacheRef.current[key] = step.component;
        }
        const StableComp = stepCacheRef.current[key];
        // Passa as props necessárias, incluindo formik e as funções de registro/foco
        return (
          <StableComp 
            formik={formik} 
            registerFieldRef={registerFieldRef} 
            setFocusToFieldName={setFocusToFieldName}
            scrollToFieldByName={scrollToFieldByName}
            pageIndex={idx} 
          />
        );
      },
      [formik],
    );

    useEffect(() => {
      const showEvent = Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow';
      const hideEvent = Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide';

      const showSub = Keyboard.addListener(showEvent, e =>
        setKeyboardHeight(e.endCoordinates?.height ?? 0),
      );
      const hideSub = Keyboard.addListener(hideEvent, () => setKeyboardHeight(0));

      return () => {
        showSub.remove();
        hideSub.remove();
      };
    }, []);

    const renderHeader = () => (
      <>
        <View style={GlobalStyle.secureMargin}>
          <AppText style={styles.title}>{steps[currentStep]?.title}</AppText>
        </View>
        <ProgressBar
          value={(currentStep + 1) / totalSteps}
          variant="determinate"
          color={theme.colors.buttonBackground}
          style={styles.progress}
        />
        <View style={GlobalStyle.spaceSmall} />
      </>
    );

    const renderFooter = () => (
      <View style={[GlobalStyle.secureMargin, GlobalStyle.row]}>
        {currentStep > 0 && (
          <View style={[styles.flexOne, { marginRight: 8 }]}>
            <SecondaryButton buttonTitle="Voltar" onPress={back} />
          </View>
        )}
        <View style={styles.flexOne}>
          <ConfirmButton
            buttonTitle={isLastStep ? 'Concluir' : 'Próximo'}
            onPress={isLastStep ? finish : next}
            isLoading={formik.isSubmitting}
          />
        </View>
      </View>
    );

    return (
      <FormikProvider value={formik}>
        <View style={styles.container}>
          <View style={GlobalStyle.spaceSmall} />
          {renderHeader()}

          <PagerView
            style={styles.pager}
            initialPage={0}
            scrollEnabled={false}
            ref={pagerRef}
            onPageSelected={e => {
                 const idx = e.nativeEvent.position;    // página que acabou de parar
                 setCurrentStep(idx);                   // mantém seu estado
              
                 // espera todas as animações acabarem antes de focar
                 InteractionManager.runAfterInteractions(() => {
                   // se você já sabe qual campo focar, use o nome direto:
                   if (steps[idx]?.autoFocusField) {
                     setFocusToFieldName(steps[idx].autoFocusField);
                   }
                 });
              }}
          >
            {steps.map((step, idx) => (
              <View key={idx} style={styles.page}>
                <ScrollView
                  contentContainerStyle={styles.scrollContent}
                  showsVerticalScrollIndicator={false}
                  keyboardShouldPersistTaps="handled"
                  scrollEventThrottle={16}
                  nestedScrollEnabled={true}
                  ref={(r) => {
                    scrollViewsRef.current[idx] = r;
                  }}
                  
                >
                  {renderStep(step, idx)}
                </ScrollView>
              </View>
            ))}
          </PagerView>

          {keyboardHeight <= 0 && renderFooter()}
        </View>
      </FormikProvider>
    );
  },
);

const makeStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    title: {
      fontSize: 18,
      fontWeight: '600',
      marginTop: 12,
      marginBottom: 8,
      color: theme.colors.textPrimary,
    },
    progress: {
      marginHorizontal: 16,
      marginBottom: 8,
    },
    pager: {
      flex: 1,
    },
    page: {
      flex: 1,
      paddingHorizontal: 15,
    },
    scrollContent: {
      flexGrow: 1,
      paddingBottom: 50,
    },
    flexOne: {
      flex: 1,
    },
  });

export default Wizard;
