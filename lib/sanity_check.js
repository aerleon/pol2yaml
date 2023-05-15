
export default async function sanity_check(expanded_targets) {

    // in general, pol2yaml should match aclgen in its configuration:
    // --base_directory should be the root of files we wish to process
    // --definitions_directory is unused except by sanity_check
    // --config_file / aerleon.yaml can contain settings
    // --policy_file should probably be ignored
    //
    // in doing so, sanity_check can invoke aclgen in a natural manner.
    //
    // There are still some corner cases around --output-directory that might not be totally obvious:
    // - if the user does not specify defs/, aclgen looks in {base_directory}/defs. But if
    //   yaml files were placed using --output_directory output/ , output/ might just contain generated yaml
    //   and no defs. So we manually set --definitions_directory to {base_directory}/defs in this case.
    // - if the user only converts a single file, it might work but we might be left with dangling includes.
    //   so --policy_file is probably bad.
    //
    // sanity_check:
    // - will not report on files that pol2yaml could not parse, a warning was shown already
    // - will not report on files that pol2yaml could not open, a warning was shown already
    // - will not report on files or directories passed to pol2yaml that pol2yaml could not stat (or did not exist), a warning was shown already
    // - will report on files where pol2yaml parsed and generated YAML OK
    
    // STDIN mode might not make sense. The user would need to specify a base_directory and locate defs
}