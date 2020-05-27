<template>
    <div class="jsonToCsv">
        <h1 class="h1">Json To Csv</h1>
        <p>Convert Json to csv file</p>
        <div class="container">
            <form>
                <div class="custom-file mb-1">
                    <input 
                        type="file"
                        class="custom-file-input" 
                        id="customFile"
                        ref="fileUpload"
                        v-on:change='changeFile'>
                    <label 
                        class="custom-file-label"
                        for="customFile">
                        Upload JSON file
                    </label>
                    <div class="invalid-feedback">Invalid file format</div>
                </div>
                <div class="form-group">
                    <textarea 
                        name="jsonText"
                        rows="6" 
                        class="form-control"
                        v-bind:class="{'is-invalid': !jsonTextValid}"
                        placeholder='...or paste your JSON text here' 
                        v-model="jsonText"
                        v-on:input="validJsonText">
                    </textarea>
                    <div class="invalid-feedback">{{jsonTextMessageError}}</div>      
                </div>
                <div class="form-group text-center">
                    <button 
                        class="btn btn-primary" 
                        id="btnDownload" 
                        v-bind:disabled="!canDownload"
                        v-on:click="downloadFile">
                            Download
                    </button>
                    <button 
                        class="btn btn-warning" 
                        type="button" 
                        v-on:click="clearForm">
                            Clear
                    </button> 
                </div>
            </form>
      
        </div>
    </div>
</template>

<script>
import json2csv from 'json2csv';

export default {
    name: 'JsonToCsv',
    props: {
    },
    data: function() {
        return {
            jsonText: '',
            jsonTextValid: true,
            jsonTextMessageError: '',
            jsonFileValid: true,
            jsonFileMessageError: '',
            fileContent: '',
            csv: '',
        };
    },
    methods: {
        validFile(event) {
            event.target.nextElementSibling.innerHTML = event.target.files[0]?.name;
            let regex = new RegExp("(.*?)\\.(json)$");
            if(regex.test(event.target.value)) { event.target.classList.remove("is-invalid"); return true; }
            else { event.target.classList.add("is-invalid"); return false;}
        },
        changeFile(event) {
            this.fileContent = '';
            const valid = this.validFile(event);
            if(!valid) { return;}
            var file = event.target.files[0];
            var reader = new FileReader();
            
            reader.onload = function(e) {
                var result = e.target.result;         
                try {
                    this.csv = this.convertJsonTextToCsv(result);
                } catch(e) {
                    this.jsonFileValid = false;
                    this.jsonFileMessageError = e.message;
                }
                this.fileContent = result;
                this.jsonFileValid = true;
                this.jsonFileMessageError = '';
            }.bind(this);
            
            reader.readAsText(file);
        },
        clearForm() {
            this.csv = "";
            this.jsonTextValid = true;
            this.jsonTextMessageError = "";
            this.jsonText= "";
            this.jsonFileValid = true;
            this.jsonFileMessageError = '';
            this.fileContent = "";
            /* TODO: check this code */
            const input = this.$refs.fileUpload;
            input.classList.remove("is-invalid");
            input.nextElementSibling.innerHTML = "Upload JSON file";
            input.files = document.createElement('input').files;
        },
        downloadFile() {
            const d = new Date();
            const a = document.createElement('a');
            const blob = new Blob([this.csv], {'type':'csv'});
            a.href = window.URL.createObjectURL(blob);
            a.download = "json_to_csv_" + d.toISOString() + ".csv";
            a.click();
        },
        validJsonText() {
            this.jsonTextValid = true;
            this.jsonTextMessageError = '';
            try {
                this.csv = this.convertJsonTextToCsv(this.jsonText);
            } catch(e) {
                this.jsonTextValid = false;
                this.jsonTextMessageError = e.message;
            }
        },
        convertJsonTextToCsv(text) {
            if(text.length === 0){ return "";}
            let data = JSON.parse(text);
            if (Array.isArray(data)) {
                data = data.map((i) => (typeof i !== "object" ? {"#######": i} : i));
                if (!data.length) data.push({"#######":""});
            }
            const unwindPaths = this.getUnwindPaths(data);
            return json2csv.parse(
                data, 
                {
                    transforms: [
                        json2csv.transforms.unwind(unwindPaths),
                        json2csv.transforms.flatten('__') 
                    ]
                }
            );
        },
        getUnwindPaths(data){
            const paths = [];
            if (Array.isArray(data)) {
                for(const d in data) paths.push(...this.getUnwindPaths(d));
            } else if(typeof data === "object") {
                for(const k in data) {
                    if (Array.isArray(data[k])) {
                    paths.push(k);          
                    }
                    // eslint-disable-next-line no-constant-condition
                    if(typeof data[k]){
                    paths.push(...this.getUnwindPaths(data[k]).map((i) => k + '.' + i));
                    }
                }
            }
            return paths;
        }
    },
    computed: {
        canDownload() {
            return (!!this.jsonText && this.jsonTextValid) 
                || (!!this.fileContent && this.jsonFileValid) ; 
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
