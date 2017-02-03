$.validator.methods["date"] = function (value, element) { return true; }

/* Format functions */
function maskCnpj(element) {
    element.maxLength = 18;
    element.value = regexCnpj(element.value);
}

function regexCnpj(valor) {
    valor = valor.replace(/\D/g, '');
    valor = valor.replace(/^(\d{2})(\d)/, '$1.$2');
    valor = valor.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
    valor = valor.replace(/\.(\d{3})(\d)/, '.$1/$2');
    valor = valor.replace(/(\d{4})(\d)/, '$1-$2');
    return valor;
}

function maskCpf(element) {
    element.maxLength = 14;
    element.value = regexCpf(element.value);
}

function regexCpf(valor) {
    valor = valor.replace(/\D/g, "");
    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    return valor;
}

function maskTelefone(element, permitirNonoDigito) {
    if (permitirNonoDigito) {
        element.maxLength = 14;
    } else {
        element.maxLength = 13;
    }

    element.value = regexTelefone(element.value);
}

function regexTelefone(valor) {
    valor = valor.replace(/\D/g, "");             //Remove tudo o que não é dígito
    valor = valor.replace(/^(\d{2})(\d)/g, "($1)$2"); //Coloca parênteses em volta dos dois primeiros dígitos
    valor = valor.replace(/(\d)(\d{4})$/, "$1-$2");    //Coloca hífen entre o quarto e o quinto dígitos
    return valor;
}

function maskCep(element) {
    element.maxLength = 9;
    element.value = regexCep(element.value);
}

function regexCep(valor) {
    valor = valor.replace(/\D/g, "");
    valor = valor.replace(/(\d{5})(\d)/, "$1-$2");
    return valor;
}

function validarCPF(cpf) {

    cpf = cpf.replace(/[^\d]+/g, '');

    if (cpf == '') return false;

    // Elimina CPFs invalidos conhecidos
    if (cpf.length != 11 ||
        cpf == "00000000000" ||
        cpf == "11111111111" ||
        cpf == "22222222222" ||
        cpf == "33333333333" ||
        cpf == "44444444444" ||
        cpf == "55555555555" ||
        cpf == "66666666666" ||
        cpf == "77777777777" ||
        cpf == "88888888888" ||
        cpf == "99999999999")
        return false;

    // Valida 1o digito
    add = 0;
    for (i = 0; i < 9; i++)
        add += parseInt(cpf.charAt(i)) * (10 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
        rev = 0;
    if (rev != parseInt(cpf.charAt(9)))
        return false;

    // Valida 2o digito
    add = 0;
    for (i = 0; i < 10; i++)
        add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
        rev = 0;
    if (rev != parseInt(cpf.charAt(10)))
        return false;

    return true;
}

function maskCurrency(element) {
    element.maxLength = 18;
    element.value = regexCurrency(element.value);
}

function regexCurrency(valor) {
    valor = valor.replace(/\D/g, '');  //permite digitar apenas números 
    valor = valor.replace(/[0-9]{15}/, '');  //limita pra máximo 999.999.999.999,99 
    if (valor.length > 3)
        valor = valor.replace(/\b0+/g, ''); // remove zeros à esquerda
    if (valor.length < 3)
        valor = '000'.substr(2 - valor.length, 3 - valor.length) + valor; // adiciona zeros à esquerda para manter formato 0,00
    //valor = valor.replace(/[0-9]{18}/, '');  //limita pra máximo 999.999.999.999.999,99 
    //valor = valor.replace(/(\d{1})(\d{14})$/, '$1.$2')  //coloca ponto antes dos últimos 14 digitos 
    valor = valor.replace(/(\d{1})(\d{11})$/, '$1.$2')  //coloca ponto antes dos últimos 11 digitos 
    valor = valor.replace(/(\d{1})(\d{8})$/, '$1.$2');  //coloca ponto antes dos últimos 8 digitos 
    valor = valor.replace(/(\d{1})(\d{5})$/, '$1.$2');  //coloca ponto antes dos últimos 5 digitos 
    valor = valor.replace(/(\d{1})(\d{1,2})$/, '$1,$2');       //coloca virgula antes dos últimos 2 digitos 
    return valor;
}

function maskPercentage(element) {
    element.maxLength = 6;
    element.value = regexPercentage(element.value);
}

function regexPercentage(valor) {
    valor = valor.replace(/\D/g, '');  //permite digitar apenas números 
    valor = valor.replace(/[0-9]{6}/, '');  //limita pra máximo 999,99 
    if (valor.length > 3)
        valor = valor.replace(/\b0+/g, ''); // remove zeros à esquerda
    if (valor.length < 3)
        valor = '000'.substr(2 - valor.length, 3 - valor.length) + valor; // adiciona zeros à esquerda para manter formato 0,00
    valor = valor.replace(/(\d{1})(\d{1,2})$/, '$1,$2');       //coloca virgula antes dos últimos 2 digitos 
    return valor;
}

function maskDate(element) {
    element.maxLength = 10;
    element.value = regexDate(element.value);
}

function regexDate(valor) {
    valor = valor.replace(/\D/g, '');
    valor = valor.replace(/(\d{2})(\d)/, '$1/$2');
    valor = valor.replace(/(\d{2})(\d)/, '$1/$2');
    return valor;
}

function maskAlphanumeric(element) {
    element.value = regexAlphanumeric(element.value);
}

function regexAlphanumeric(valor) {
    valor = valor.replace(/[^a-zA-Z0-9_]/g, '');

    return valor;
}

/* Date functions */
function parseDate(ddmmyyyy) {
    var dmy = ddmmyyyy.split('/')
    return new Date(dmy[2], dmy[1], dmy[0] - 1);
}

function dayDiff(first, second) {
    return Math.round((second - first) / (1000 * 60 * 60 * 24));
}

/* General functions */
function loadModule(controller, action) {
    $.ajax({
        url: createUrl(controller, action),
        type: 'POST',
        success: function (data, status, xhr) {
            $('#divConteudo').html(data);
        },
        error: function (error) {
            if (error.status == 500 && error.responseText.toLowerCase().indexOf('não autorizado') > 0)
                window.location.replace(createUrl('Error', 'Unauthorized'));
            showPopup('loadModuleError', dialogState.Error, 'Não foi possível carregar os dados', 100, [{ text: 'Ok', click: dialogButton.Close }]);
        }
    });
}

function loadDropDownList(controller, action, requestData, dropDownListName, optionLabel, truncateTextAt, selectedValue) {
    $.ajax({
        url: createUrl(controller, action),
        method: 'POST',
        async: false,
        data: requestData,
        success: function (data, status, xhr) {
            if (data.success) {
                fillDropDownList(data.selectList, dropDownListName, optionLabel, truncateTextAt, selectedValue);
            }
            else
                showAlert(dialogState.Error, error.message);
        },
        error: function (error) {
            showAlert(dialogState.Error, error.message);
        },
        cache: false
    });
}

function fillDropDownList(selectList, dropDownListName, optionLabel, truncateTextAt, selectedValue) {
    var dropDownList = $('#' + dropDownListName);
    dropDownList.empty();
    dropDownList.prop('disabled', false);

    if (optionLabel != null && optionLabel != undefined)
        dropDownList.append($('<option>', { text: optionLabel, value: '' }));

    $.each(selectList, function (index, item) {
        var text = item.Text;
        if (truncateTextAt != null && truncateTextAt != undefined) {
            text = item.Text.substring(0, truncateTextAt);
            if (item.Text.length > truncateTextAt)
                text += '...';
        }

        if (selectedValue != null && selectedValue != undefined && selectedValue == item.Value)
            dropDownList.append($('<option>', { value: item.Value, text: text, title: item.Text, selected: true }));
        else
            dropDownList.append($('<option>', { value: item.Value, text: text, title: item.Text }));
    });
    dropDownList.trigger("chosen:updated");
}

function createUrl(controller, action) {
    var url = controller;

    if (url.substr(0, 1) != '/')
        url = '/' + url;

    if (action != undefined && action != null && action != '')
        url += '/' + action;

    if (sessionStorage.appPath != '/')
        url = sessionStorage.appPath + url;

    return url
}

function slideFade(exibir, nomeControle, endFunction) {
    var slideDownDuration = 750;
    var slideUpDuration = 700;
    var controle = $(eval(nomeControle));

    var newEndFunction = function () {
        if (endFunction != undefined && endFunction != null && endFunction != "")
            endFunction();
    }

    if (exibir)
        controle.fadeIn({ duration: slideDownDuration, queue: false }).css('display', 'none').slideDown(slideDownDuration, newEndFunction)
    else
        controle.fadeOut({ duration: slideUpDuration, queue: false }).slideUp(slideUpDuration, newEndFunction);
}

$(document).unbind('keydown').bind('keydown', function (event) {
    var doPrevent = false;
    var keyCode = event.keyCode || event.which;
    if (keyCode === 8) {
        var d = event.srcElement || event.target;
        if ((d.tagName.toUpperCase() === 'INPUT' &&
             (
                 d.type.toUpperCase() === 'TEXT' ||
                 d.type.toUpperCase() === 'PASSWORD' ||
                 d.type.toUpperCase() === 'FILE' ||
                 d.type.toUpperCase() === 'EMAIL' ||
                 d.type.toUpperCase() === 'SEARCH' ||
                 d.type.toUpperCase() === 'DATE')
             ) ||
             d.tagName.toUpperCase() === 'TEXTAREA') {
            doPrevent = d.readOnly || d.disabled;
        }
        else {
            doPrevent = true;
        }
    }

    if (doPrevent) {
        event.preventDefault();
    }
});

function logoff() {
    showPopup('modalConfirmLogoff', dialogState.Information, 'Deseja sair do sistema?', 100,
        [
            {
                text: 'Sair',
                click: function () {
                    $.ajax({
                        url: createUrl('Login', 'Logoff'),
                        type: 'POST',
                        success: function (data, status, xhr) {
                            window.location.replace(createUrl('Login', 'Index'));
                        },
                        error: function (error) {
                            showPopup('logoffError', dialogState.Error, 'Ocorreu um problema ao efetuar Log Off', 100, [{ text: 'Ok', click: dialogButton.Close }]);
                        }
                    });
                }
            },
            { text: 'Cancelar', click: dialogButton.Close }
        ]
    );
}

function forgotPassword() {
    showForm(dialogMode.Popup, 'forgotPassword', 'Login', 'ForgotPassword', '');
}

function generalInfo() {
    $.ajax({
        url: createUrl('Login', 'GeneralInfo'),
        type: 'POST',
        success: function (data, status, xhr) {
            showPopup('generalInfo', dialogState.Information, data, 600, [{ text: 'Fechar', click: dialogButton.Close }]);
        },
        error: function (error) {
            showPopup('logoffError', dialogState.Error, 'Ocorreu um problema ao listar documentos.', 100, [{ text: 'Ok', click: dialogButton.Close }]);
        }
    });
}

function startChosen() {
    $(".chosen-select").chosen({
        width: '100%',
        no_results_text: "Nenhum registro encontrado.",
        disable_search_threshold: 3
    });
}

function formSubmit(form) {
    $.validator.unobtrusive.parse(form);
    if (form.valid()) {
        var submitFunction = function () {
            $.post(form.attr('action'), form.serialize(),
            function (data) {
                if (data.success) {
                    showAlert(dialogState.Success, data.message);
                } else {
                    showAlert(dialogState.Error, data.message);
                }
            }).fail(function (data) {
                showAlert(dialogState.Error, data.responseText);
            });
        }

        if (form.find('input[type="file"]').length > 0) {
            // upload files
            var totalUploads = 0;
            var erroUpload = false;

            form.find('input[type="file"]').each(
                function () {
                    totalUploads++;

                    var totalFiles = document.getElementById($(this).attr('id')).files.length;
                    if (totalFiles > 0) {

                        for (var i = 0; i < document.getElementById($(this).attr('id')).files.length; i++) {
                            var file = document.getElementById($(this).attr('id')).files[i];
                            var formData = new FormData();
                            formData.append('FileUpload', file);
                            formData.append('PropertyName', $(this).attr('id'));

                            $.ajax({
                                type: 'POST',
                                url: createUrl('Arquivo', 'Upload'),
                                data: formData,
                                dataType: 'json',
                                contentType: false,
                                processData: false,
                                async: false,
                                success: function (data) {
                                    if (data.success) {
                                        if (totalUploads == form.find('input[type="file"]').length) {
                                            submitFunction();
                                        }
                                    } else {
                                        showAlert(dialogState.Error, data.message);
                                        hideLoadingPopupModal();
                                        erroUpload = true;
                                    }

                                },
                                error: function (data) {
                                    showAlert(dialogState.Error, 'Erro ao enviar arquivo.');
                                }
                            });
                            if (erroUpload) {
                                break;
                            }
                        }
                    }
                    else {
                        if (totalUploads == form.find('input[type="file"]').length && !erroUpload) {
                            submitFunction();
                        }
                    }
                });
        } else {
            submitFunction();
        }
    };
};

